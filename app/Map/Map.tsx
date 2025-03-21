import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
//import "leaflet/dist/leaflet.css";


const HPI_POSITION: LatLngExpression = [52.391, 13.131];

const polygon: LatLngExpression[] = [
  [52.389, -13.129],
  [52.392, -13.127],
  [52.395, -13.14],
]
/*
geo:52.391601,13.123174?z=19
August-Bebel-Straße x Stahnsdorfer Straße
Süd-West:
geo:52.391754,13.131862?z=19
Stahnsdorfer Straße x Bernhard-Beyer-Straße
Nord-West:
geo:52.394646,13.134619?z=19
Schaltposten Griebnitzsee
Nord-Ost:
geo:52.393637,13.122751?z=17
*/
const blueOptions = { color: 'blue' }

export default function Map() {
    return (
    <MapContainer center={HPI_POSITION} zoom={15} scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%", borderRadius: 1 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {/* <Polygon pathOptions={blueOptions} positions={polygon} /> */}
    </MapContainer>
    )
}
