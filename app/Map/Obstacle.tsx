import { Marker, Popup } from 'react-leaflet';
import type { ObstacleObject } from './obstacles';

import Leaflet, { type LatLngExpression } from 'leaflet';



const elevator = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-32,80v96H136V112Zm-56,96H80V112h40Zm88,0H192V104a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8V208H48V48H208V208ZM152,72a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,72Z"></path></svg>`;
const tree = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 256 256"><path d="M198.1,62.59a76,76,0,0,0-140.2,0A71.71,71.71,0,0,0,16,127.8C15.9,166,48,199,86.14,200A72.09,72.09,0,0,0,120,192.47V232a8,8,0,0,0,16,0V192.47A72.17,72.17,0,0,0,168,200l1.82,0C208,199,240.11,166,240,127.8A71.71,71.71,0,0,0,198.1,62.59ZM169.45,184a56.08,56.08,0,0,1-33.45-10v-41l43.58-21.78a8,8,0,1,0-7.16-14.32L136,115.06V88a8,8,0,0,0-16,0v51.06L83.58,120.84a8,8,0,1,0-7.16,14.32L120,156.94v17a56,56,0,0,1-33.45,10C56.9,183.23,31.92,157.52,32,127.84A55.77,55.77,0,0,1,67.11,76a8,8,0,0,0,4.53-4.67,60,60,0,0,1,112.72,0A8,8,0,0,0,188.89,76,55.79,55.79,0,0,1,224,127.84C224.08,157.52,199.1,183.23,169.45,184Z"></path></svg>`;
const angle = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 256 256"><path d="M96,72a8,8,0,0,1,8-8A104.11,104.11,0,0,1,208,168a8,8,0,0,1-16,0,88.1,88.1,0,0,0-88-88A8,8,0,0,1,96,72ZM240,192H80V32a8,8,0,0,0-16,0V64H32a8,8,0,0,0,0,16H64V200a8,8,0,0,0,8,8H240a8,8,0,0,0,0-16Z"></path></svg>`;
const stairs = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 256 256'><path d='M200,168a32.06,32.06,0,0,0-31,24H72a32,32,0,0,1,0-64h96a40,40,0,0,0,0-80H72a8,8,0,0,0,0,16h96a24,24,0,0,1,0,48H72a48,48,0,0,0,0,96h97a32,32,0,1,0,31-40Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,200,216Z'></path></svg>";

const green = "#29DD29";
const red = "#CC3535";
const yellow = "#EED514";

const positionAverage = (positions: number[][]) => {
    const sum = positions.reduce((acc, pos) => {
        return [acc[0] + pos[0], acc[1] + pos[1]];
    }
    , [0, 0]);
    return [sum[0] / positions.length, sum[1] / positions.length];
};


export default function Obstacles(props: { 
    obstacle: ObstacleObject
    onClick: () => void
 }) {

    let icon = '';
    switch (props.obstacle.type) {
        case 'path':
            icon = tree;
            break;
        case 'slope':
            icon = angle;
            break;
        case 'stairs':
            icon = stairs;
            break;
        case 'elevator':
            icon = elevator;
            break;
    }

    let severity = Math.random();
    let color = '';
    if (severity < 0.33) {
        color = green;
    } else if (severity < 0.66) {
        color = yellow;
    } else {
        color = red;
    }


    //@ts-ignore
    const factory : any = new L.divIcon({
        className: '',
        iconAnchor: [12, 25],
        popupAnchor: [0, -15],
        iconSize: [32, 32],
        html: `<div style="background-color: ${color}; border-radius: 50%; width: 32px; height: 32px; padding: 8px;">${icon}</div>`  });


    const position = positionAverage(props.obstacle.coords);
    return (
        <Marker position={position as LatLngExpression}
                icon={factory}
                eventHandlers={{
                    click: (e) => {
                       props.onClick();
                    },
                  }}
        >
            <Popup>
               {props.obstacle.type}
            </Popup>
        </Marker>
    );
};