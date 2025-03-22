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
import { Loader2 } from 'lucide-react';

const ClickableMap = ({ onClick }: { onClick: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

const flip = (arr:LatLngExpression[]) => [arr[1],arr[0]];

export default function Map() {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("Haus L");
  const [start, setStart] = useState("Haus 1");
  const [coordinates, setCoordinates] = useState(); 
  const [route, setRoute] = useState<LatLngExpression[]>([]);

  const destinationRef = React.useRef<HTMLInputElement | null>(null);
  const startRef = React.useRef<HTMLInputElement | null>(null);
  const [previousActiveRef, setPreviousActiveRef] = useState<HTMLInputElement | null>(null);

  const globalContext = useContext(GlobalContext);

  const [selectedObstacle, setSelectedObstacle] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoute = async() => {
      try {
        //@ts-ignore
        let polygons = OBSTACLES.obstacles.map(obs => ([obs["coords"].map(flip).concat([flip(obs["coords"][0])])]));
        
        let relevantPolygons = polygons.filter((x, i) => globalContext?.severeties[i]! >= 0.7);
        
        //@ts-ignore
        const route = await getWalkingRoute(coordinates[0], coordinates[1], relevantPolygons);
        if(route)setRoute(route);
      } catch(error){console.log("Error while fetching");}
    }
    const timeout = setTimeout(() => setLoading(true),200);
      fetchRoute().then(() => {
        clearTimeout(timeout);
        setLoading(false);
    });
    return () => clearTimeout(timeout);
  }, [coordinates, globalContext?.severeties]);

  const updateCoords = () => {
    const fetchCoords = async() => {
      let startAdr: any, destAdr: any;
      try {
        startAdr = await getCoordsFromAdress(start);
        destAdr = await getCoordsFromAdress(destination);
      }
      catch(error){return;}
      //@ts-ignore 
      setCoordinates([flip(startAdr), flip(destAdr)]);
    }
    fetchCoords();
  };

  return (
    <div className="h-full w-full relative">
      <div className="border h-full w-full">
        <MapContainer center={HPI_POSITION} zoom={15} scrollWheelZoom={true}
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
            return (<Obstacle key={id} obstacleId={id} onClick={()=> {
              setSelectedObstacle(id);
            }}/>)
          })};
          {OBSTACLES.obstacles.filter((x,i) => globalContext?.severeties[i]! >= 0.7).map((obstacle, id) => {
            return (
              <Polygon key={id} pathOptions={{ color: 'red', stroke: false }} positions={obstacle["coords"]} />
            );
          })};
        </MapContainer>
      </div>

      <div className='absolute top-0 left-0 w-full z-1000'>
        <InputRoute
          dest={destination} setDest={setDestination} destRef={destinationRef}
          start={start} setStart={setStart} startRef={startRef} update={updateCoords} 
        />
        <div className="w-full h-2 bg-white"></div>
        <div
          style={{
            height: "100px",
            opacity: 0.5,
            background: "linear-gradient(to bottom, white, transparent)",
          }}
        ></div>
      </div>
      {loading ?
      <div className='absolute top-64 left-0 w-full z-2000 pointer-events-none'>
        <div className="transition-all w-full pt-20 h-48 grid justify-center justify-items-center">
          <Loader2 size={64} className='animate-spin text-gray-700'/>
        </div>
      </div> : null}
      <Overlay selectedObstacle={selectedObstacle} onClose={() => setSelectedObstacle(null)}/>
    </div>
  )
}
