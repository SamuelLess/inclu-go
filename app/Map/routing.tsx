import type { LatLngExpression } from 'leaflet';

export const getCoordsFromAdress = async (description: string) => {
  const BASE_URL = `http://localhost:8115/${encodeURIComponent(description)}`;
  
  const response = fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = response.then(r => r.json())
  const midpoint = (arr: number[]) => [(arr[1]+arr[3])/2, (arr[0]+arr[2])/2];

  return data.then((d : any) => {
    const jsonData = JSON.parse(d);
    //console.log(jsonData);
    //console.log(jsonData["features"][0]["geometry"]["coordinates"])
    return jsonData["features"][0]["geometry"]["coordinates"];
  }).catch(e => {
    console.error(e);
  })

}

const decodePolyline = (encoded: string): LatLngExpression[] => {
  let index = 0;
  const coordinates: LatLngExpression[] = [];
  let latitude = 0;
  let longitude = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;

    // Decode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude += (result & 1) ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;

    // Decode longitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude += (result & 1) ? ~(result >> 1) : result >> 1;

    coordinates.push([latitude / 1e5, longitude / 1e5]); // Divide by 1e5 to get the actual lat/lng
  }

  return coordinates;
};

export const getWalkingRoute = async (start: LatLngExpression, end: LatLngExpression, avoidPolygon: any) => {
    const BASE_URL = "http://localhost:8114/ors/v2/directions/foot-walking";
    const fixShitApi = (arr: any) => [arr[1], arr[0]] 
    const response = fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coordinates: [fixShitApi(start), fixShitApi(end)],
        options: {
          avoid_polygons: {
            type: "MultiPolygon",
            coordinates: avoidPolygon
          }
        }
      }),
    });
    const data = response.then(r => r.json())
    
    return data.then((d) => {
      // check if d["routes"] exists
      if (!d["routes"]) {
        return [];
      }
      //console.log(d["routes"][0]["segments"][0]["steps"])
      //console.log(decodePolyline(d["routes"][0]["geometry"]));
      return decodePolyline(d["routes"][0]["geometry"]);
    }).catch(e => {
      console.error(e);
    })
}