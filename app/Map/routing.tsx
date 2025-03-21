import type { LatLngExpression } from 'leaflet';

export const getCoordsFromAdress = async (description: string) => {
  const BASE_URL = "http://localhost:8114/ors/v2/geocode/search";
  
  const response = fetch(`${BASE_URL}?text=${encodeURIComponent(description)}`,
    {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const data = response.then(r => r.json())

  const midpoint = (arr: number[]) => [(arr[1]+arr[3])/2, (arr[0]+arr[2])/2];

  return data.then((d : any) => {
    console.log(midpoint(d["bbox"]));
    return midpoint(d["bbox"]);
  }).catch(e => {
    console.error(e);
  })

}

export const getWalkingRoute = async (start: LatLngExpression, end: LatLngExpression, avoidPolygon: any) => {
    const BASE_URL = "http://localhost:8114/ors/v2/directions/foot-walking";
    const fixShitApi = (arr: any) => [arr[1], arr[0]] 
    const response = fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coordinates: [fixShitApi(start), fixShitApi(end)],
      }),
    });
    const data = response.then(r => r.json())

    return data.then((d : any) => {
      console.log(d)
      return d;
    }).catch(e => {
      console.error(e);
    })
}