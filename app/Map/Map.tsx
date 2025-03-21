import { MapContainer, TileLayer, Polygon, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { obstacles, HPI_POSITION, hpiBuilding, START, END } from './hardcoded';
import { getWalkingRoute, getCoordsFromAdress } from "./routing";
import React from 'react';
import { useState } from "react";
import { InputRoute } from './InputRoute';
import { Overlay } from './Overlay';

//const [destination, setDestination] = React.useState("Hallo");
const route = getWalkingRoute(START, END, obstacles);
console.log(route);
const adress = getCoordsFromAdress("Hasso-Plattner-Institut Potsdam");
console.log(adress);

const ClickableMap = ({ onClick }: { onClick: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

export default function Map() {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState("Haus L");
  const [start, setStart] = useState("Haus 1");

  const destinationRef = React.useRef<HTMLInputElement | null>(null);
  const startRef = React.useRef<HTMLInputElement | null>(null);
  const [previousActiveRef, setPreviousActiveRef] = useState<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const handleFocus = (_: any) => {
      if (document.activeElement instanceof HTMLInputElement) {
        setPreviousActiveRef(document.activeElement);
      }
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  return (
    <div className="h-full w-full relative">

      <div className="border h-full w-full">
        <MapContainer center={HPI_POSITION} zoom={15} scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", borderRadius: 1 }}>
          <TileLayer
           // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=5SQJHNDVIDg6LwTSXS8M"
          />

          <ClickableMap onClick={(latlng) => {
            setClickedPosition(latlng)
            console.log(document.activeElement)
            if (previousActiveRef == startRef.current) {
              setStart(`${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}`)
              destinationRef.current?.focus()
            }

            if (previousActiveRef == destinationRef.current) {
              setDestination(`${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}`)
              startRef.current?.focus()
            }
          }} />

          <Polygon pathOptions={{ color: "#62A0EA" /* blue */ }} positions={hpiBuilding} />

          {obstacles.map(obstacle => {
            return (<Polygon pathOptions={{ color: "#ED333B" /* red */ }} positions={obstacle} />)
          })};

          {clickedPosition && (
            <Marker position={[clickedPosition.lat, clickedPosition.lng]}>
              <Popup>
                Latitude: {clickedPosition.lat.toFixed(6)} 
                <br />
                Longitude: {clickedPosition.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className='absolute top-0 left-0 w-full z-1000'>
        <InputRoute
          dest={destination} setDest={setDestination} destRef={destinationRef}
          start={start} setStart={setStart} startRef={startRef}
        />
        <div className="w-full h-2 bg-white"></div>
        <div
          style={{
            height: "100px",
            background: "linear-gradient(to bottom, white, transparent)",
          }}
        ></div>
      </div>
      <Overlay />
    </div>
  )
}
