from fastapi import FastAPI, Request
import httpx
from fastapi.middleware.cors import CORSMiddleware
from geopy.geocoders import Nominatim
from pprint import pprint
import urllib.parse

app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Proxy route
@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])
async def proxy(path: str, request: Request):
    print(path)
    encoded = urllib.parse.quote_plus(path)
    print(encoded)
    target_url = f"https://nominatim.openstreetmap.org/search?q={encoded}&format=geocodejson"
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=target_url,
            follow_redirects=True,
            headers={key: value for key, value in request.headers.items() if key.lower() != "host"} |
                {'User-Agent': 'HackHPI2025APP/5.0'},
        )
    print(f"{response=}", flush=True)
    return response.text


