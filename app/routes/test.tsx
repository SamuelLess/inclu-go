import ObstacleCard from "~/components/InfoPopup";
import { ALL_TYPES } from "~/components/InfoPopup";

export default function Test() {
  return (<div className="h-full flex-column">
    {
        ALL_TYPES.map((type) => (
            <ObstacleCard key={type} type={type} />))
    }
    </div>);
}