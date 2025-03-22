from fastapi import FastAPI, Request
import httpx
from fastapi.middleware.cors import CORSMiddleware
from pprint import pprint
import urllib.parse
from aiocache import cached

app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@cached(ttl=3000)  # Cache results for 50 minutes
async def fetch_from_cache(url: str, method: str, headers: dict):
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=method,
            url=url,
            follow_redirects=True,
            headers=headers
        )
    return response.text

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])
async def proxy(path: str, request: Request):
    print(path)
    encoded = urllib.parse.quote_plus(path.lower())
    print(encoded)
    target_url = f"https://nominatim.openstreetmap.org/search?q={encoded}&format=geocodejson"
    
    headers = {key: value for key, value in request.headers.items() if key.lower() != "host"} | {'User-Agent': 'OurHackHPIProjectPLSLETUSTHROUGH/1.0'}
    
    response_text = await fetch_from_cache(target_url, request.method, headers)
    
    return response_text
