import Map from "~/Map/Map";
import {Tindernator} from "~/Map/Tindernator"
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Inclu-Go"},
    {name: "description", content: "Better life for everyone!"},
  ];
}
export default function Home() {
  return (<div className="h-full flex-column">
        <Map />
    </div>);
}
