import { Marker, Popup } from 'react-leaflet';
import type { ObstacleObject } from './obstacles';

import Leaflet from 'leaflet';


const stairs = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 256 256'><path d='M200,168a32.06,32.06,0,0,0-31,24H72a32,32,0,0,1,0-64h96a40,40,0,0,0,0-80H72a8,8,0,0,0,0,16h96a24,24,0,0,1,0,48H72a48,48,0,0,0,0,96h97a32,32,0,1,0,31-40Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,200,216Z'></path></svg>";
export default function Obstacles(props: { obstacle: ObstacleObject }) {
    //@ts-ignore
    const factory : any = new L.divIcon({
        className: '',
        iconAnchor: [12, 25],
        popupAnchor: [0, -15],
        iconSize: [32, 32],
        html: `<div style="background-color: red; border-radius: 50%; width: 32px; height: 32px; padding: 8px;">${stairs}</div>`  });

    return (
        <Marker position={[props.obstacle.lat, props.obstacle.lon]}
                icon={factory}
        >
            <Popup>
               {props.obstacle.type}
            </Popup>
        </Marker>
    );
};