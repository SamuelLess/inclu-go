import Map from "~/Map/Map";
import {Tindernator} from "~/Map/Tindernator"
import type {Route} from "./+types/home";
import {GlobalState} from "../Map/Globalstate";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Inclu-Go"},
    {name: "description", content: "Better life for everyone!"},
  ];
}
export default function Home() {
  return (<GlobalState />);
}
