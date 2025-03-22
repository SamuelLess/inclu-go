import { useState, useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { GlobalContext } from "~/Map/Globalstate";
import { obstacles } from "~/Map/obstacles";

const OBSTACLES = {
  beach: {
    img: '/obstacles/beach.jpg',
    severity: 80,
    description: 'Sandy environment',
    status: 'Diffirent access paths planned.',
    about: 'This is just some beach.',
  },
  stairs: {
    img: '/obstacles/normalstairs.webp',
    severity: 40,
    description: 'Stairs',
    status: '',
  },
  broken_lift: {
    img: '/obstacles/brokenlift.jpg',
    severity: 85,
    description: 'Broken Lift',
    status: 'under maintenance',
    about: 'Elevator in City Shopping Mall broken. Should be repaired in 2 days.',
  },
  bumpy_path: {
    img: '/obstacles/bumpy.jpg',
    severity: 60,
    description: 'Bumpy Path',
    status: '',
    about: 'Uneven pavement makes movement difficult.',
  },
  missing_handrail: {
    img: '/obstacles/handrail.jpg',
    severity: 50,
    description: 'Missing Handrail',
    status: '',
    about: 'No handrail support on a steep staircase.',
  },
  steep_incline: {
    img: '/obstacles/incline.jpg',
    severity: 75,
    description: 'Steep Incline',
    status: 'no alternative route',
    about: 'A steep hill makes wheelchair movement challenging.',
  },
  unusual_stairs: {
    img: '/obstacles/weirdstairs.jpg',
    severity: 70,
    description: 'Unusual Stairs',
    status: '',
    about: 'Oddly shaped stairs that are difficult to navigate.',
  },
  wheelchair_access: {
    img: '/obstacles/wheelchair.webp',
    severity: 30,
    description: 'Limited Wheelchair Access',
    status: 'needs improvement',
    about: 'Wheelchair access is available but not optimal.',
  },
};


export const ALL_TYPES = Object.keys(OBSTACLES);

const ObstacleCard = (props: {
  selectedObstacle: number,
  type: string,
  severity: number,
  onClose?: () => void
}) => {
  // @ts-ignore
  const obstacle = OBSTACLES[props.type] || OBSTACLES.beach;
  const [severity, setSeverity] = useState(obstacle.severity);
  const [isClosing, setIsClosing] = useState(false);
  
  const ourObstacle = obstacles[props.selectedObstacle];

  useEffect(() => {
    setIsClosing(false);
  }, [props.selectedObstacle]);

  const handleClose = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      if (props.onClose) {
        props.onClose();
      }
    }, 300); // Match this with animation duration
  };

  return (
    <Card className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden pt-0 transition-all duration-300 ${
      isClosing ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
    }`}>
      <div className="relative w-full h-32">
        <div
          className="absolute bg-black opacity-50 w-[70px] h-[5px] rounded left-1/2 -translate-x-1/2 top-2 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleClose}
          title="Close popup"
        />
        <img
          src={ourObstacle.img}
          alt={ourObstacle.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 pt-0">
        <h2 className="text-lg font-bold">{ourObstacle.name}</h2>
        <p className="text-gray-500">{'No status available'}</p>
        {ourObstacle.desc && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-gray-600">ABOUT</h3>
            <p className="text-sm text-gray-700">{ourObstacle.desc}</p>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">BARRIER SEVERITY</h3>
          <GlobalContext.Consumer>
            {(context) => {
              const severity = context?.severeties[props.selectedObstacle] || 0;
              console.log("severity", severity);
              return <Slider value={[severity*100]} onValueChange={(newValue) => {
                
                context?.setSevereties((oldSeverities : number[]) => {
                  const newSeverities = [...oldSeverities];
                  console.log('newSeverities', newSeverities);
                  newSeverities[props.selectedObstacle] = newValue[0]/100;
                  return newSeverities;
              })}} max={100} step={1} />
            }}
          </GlobalContext.Consumer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObstacleCard;
