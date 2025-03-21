import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider"

const images = {
    'beach': '/obstacles/beach.jpg',
    'stairs': '/obstacles/normalstairs.jpg',
    'elevator': '/obstacles/elevator.jpg',
    'construction': '/obstacles/construction.jpg',
    'escalator': '/obstacles/escalator.jpg',
    'handrail': '/obstacles/.jpg',
}



const ObstacleCard = () => {

    const [severity, setSeverity] = useState(20);
    const getColor = () => {
    if (severity < 30) return "bg-green-500";
    if (severity < 70) return "bg-yellow-500";
    return "bg-red-500";
  };


  return (
    <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <img 
          src="/obstacles/beach.jpg" // Ensure the image is placed in the public directory
          alt="Broken Elevator"
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-lg font-bold">Broken Elevator</h2>
        <p className="text-gray-500">repair planned</p>
        <div className="mt-2">
          <h3 className="text-sm font-semibold text-gray-600">ABOUT</h3>
          <p className="text-sm text-gray-700">
            Elevator in City Shopping Mall broken. Should be repaired in 2 days.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600">BARRIER SEVERITY</h3>
          {/*<Progress value={20} className="mt-1" />*/}
           <Slider defaultValue={[severity]} onValueChange={setSeverity} max={100} step={10} 
                   className={`h-2 w-full mt-2 rounded ${getColor()}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ObstacleCard;
