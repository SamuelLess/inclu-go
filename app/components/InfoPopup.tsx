import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";

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

const ObstacleCard = ({ type = "beach" }) => {
  // @ts-ignore
  const obstacle = OBSTACLES[type] || OBSTACLES.beach;
  const [severity, setSeverity] = useState(obstacle.severity);

  return (
    <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden pt-0">
      <div className="relative w-full h-32">
        <div className="absolute bg-black opacity-50 w-[70px] h-[5px] rounded left-1/2 -translate-x-1/2 top-2" />
        <img 
          src={obstacle.img} 
          alt={obstacle.description} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 pt-0">
        <h2 className="text-lg font-bold">{obstacle.description}</h2>
        <p className="text-gray-500">{obstacle.status || 'No status available'}</p>
        {obstacle.about && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-gray-600">ABOUT</h3>
            <p className="text-sm text-gray-700">{obstacle.about}</p>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600">BARRIER SEVERITY</h3>
          <Slider defaultValue={[severity]} onValueChange={setSeverity} max={100} step={10} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ObstacleCard;
