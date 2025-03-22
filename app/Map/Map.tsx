import { MapContainer, TileLayer, Polygon, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { obstacles, HPI_POSITION, hpiBuilding, START, END } from './hardcoded';
import { getWalkingRoute, getCoordsFromAdress } from "./routing";
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { InputRoute } from './InputRoute';
import { Overlay } from './Overlay';
import * as OBSTACLES from './obstacles';
import Obstacle from './Obstacle';
import { GlobalContext } from './Globalstate';
import { UserCircle, Gear } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

const ClickableMap = ({ onClick }: { onClick: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

const destFlag = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path></svg>';
const startPin = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>';

//@ts-ignore
const FLAG: any = new L.divIcon({
  className: '',
  iconAnchor: [12, 25],
  popupAnchor: [0, -15],
  iconSize: [32, 32],
  html: `<div style="background-color: #050505;border-radius: 50%; width: 32px; height: 32px; padding: 8px;">${destFlag}</div>`
});

//@ts-ignore
const PIN: any = new L.divIcon({
  className: '',
  iconAnchor: [12, 25],
  popupAnchor: [0, -15],
  iconSize: [32, 32],
  html: `<div style="background-color: #CCCCCC;border-radius: 50%; width: 32px; height: 32px; padding: 8px;">${startPin}</div>`
});

const flip = (arr: LatLngExpression[]) => [arr[1], arr[0]];

export default function Map() {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("Potsdam HPI");
  const [start, setStart] = useState("Babelsberg");
  const [coordinates, setCoordinates] = useState<LatLngExpression[]>([[0, 0], [0, 0]]);
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [adressInputErr, setInputErr] = useState(0);

  const destinationRef = React.useRef<HTMLInputElement | null>(null);
  const startRef = React.useRef<HTMLInputElement | null>(null);
  const [previousActiveRef, setPreviousActiveRef] = useState<HTMLInputElement | null>(null);

  const globalContext = useContext(GlobalContext);

  const [selectedObstacle, setSelectedObstacle] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        //@ts-ignore
        let polygons = OBSTACLES.obstacles.map(obs => ([obs["coords"].map(flip).concat([flip(obs["coords"][0])])]));

        let relevantPolygons = polygons.filter((x, i) => globalContext?.severeties[i]! >= 0.7);

        //@ts-ignore
        const route = await getWalkingRoute(coordinates[0], coordinates[1], relevantPolygons);
        if (route) setRoute(route);
        else { throw new Error("no route"); }
      } catch (error) { console.log("txt"); setInputErr(3); return; }
    }
    const timeout = setTimeout(() => setLoading(true), 200);
    try {
      fetchRoute().then(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
    } catch (err) {
      console.log("txt"); setInputErr(3); return;
    }
    return () => clearTimeout(timeout);
  }, [coordinates, globalContext?.severeties]);

  const updateCoords = () => {
    const fetchCoords = async () => {
      let startAdr: any, destAdr: any;
      setInputErr(0);
      try {
        startAdr = await getCoordsFromAdress(start);
        if (!startAdr) throw new Error("not found");
      }
      catch (error) { setInputErr(1); return; }
      try {
        destAdr = await getCoordsFromAdress(destination);
        if (!destAdr) throw new Error("not found");
      }
      catch (error) { setInputErr(2); return; }
      //@ts-ignore 
      setCoordinates([flip(startAdr), flip(destAdr)]);
    }
    fetchCoords();
  };

  return (
    <div className="h-full w-full relative">
      <div className="border h-full w-full">
        <MapContainer center={HPI_POSITION} zoom={16} scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", borderRadius: 1 }}>
          <TileLayer
            url="https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=5SQJHNDVIDg6LwTSXS8M"
          />
          <ClickableMap onClick={(latlng) => {
            setClickedPosition(latlng)
            //console.log(document.activeElement)
            if (previousActiveRef == startRef.current) {
              setStart(`${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}`)
              destinationRef.current?.focus()
            }

            if (previousActiveRef == destinationRef.current) {
              setDestination(`${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}`)
              startRef.current?.focus()
            }
          }} />

          <Polyline positions={route} color="blue" weight={5} opacity={0.7} />

          {OBSTACLES.obstacles.map((_obstacle, id) => {
            return (<Obstacle key={id} obstacleId={id} onClick={() => {
              setSelectedObstacle(id);
            }} />)
          })};
          {OBSTACLES.obstacles.filter((x, i) => globalContext?.severeties[i]! >= 0.7).map((obstacle, id) => {
            return (
              <Polygon key={id} pathOptions={{ color: 'red', stroke: false }} positions={obstacle["coords"]} />
            );
          })};

          <Marker icon={PIN} position={coordinates[0]}></Marker>
          <Marker icon={FLAG} position={coordinates[1]}></Marker>
        </MapContainer>
      </div>

      <div className='absolute top-0 left-0 w-full z-1000'>
        <InputRoute
          dest={destination} setDest={setDestination} destRef={destinationRef}
          start={start} setStart={setStart} startRef={startRef} update={updateCoords}
          error={adressInputErr}
        />
        <div className="w-full h-2 bg-white"></div>
        <div
          style={{
            height: "100px",
            background: "linear-gradient(to bottom, white, transparent)",
          }}
        ></div>
      </div>
      {loading ?
        <div className='absolute top-64 left-0 w-full z-2000 pointer-events-none'>
          <div className="transition-all w-full pt-20 h-48 grid justify-center justify-items-center">
            <Loader2 size={64} className='animate-spin text-gray-700' />
          </div>
        </div> : null}
      <Overlay selectedObstacle={selectedObstacle} onClose={() => setSelectedObstacle(null)} />
      <div className='absolute top-[30%] left-0 z-1000'>
        <div className='w-[32] bg-primary rounded-r-xl z-1000 p-2 mb-2 inset-shadow-sm shadow-whit'>
          <UserCircle size={32} color={'white'} />
        </div>

        <div className='w-[32] bg-primary rounded-r-xl z-1000 p-2'>
          <Gear size={32}  color={'white'}/>
        </div>
      </div>

    </div>
  )
}
