import ObstacleCard from "~/components/InfoPopup";
import { ALL_TYPES } from "~/components/InfoPopup";

export default function Test() {
  return (<div className="grid grid-cols-1 gap-2">
    {
        ALL_TYPES.map((type) => (
            <ObstacleCard key={type} type={type} />))
    }
    </div>);
}