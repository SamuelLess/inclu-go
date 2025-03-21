import type {Route} from "./+types/home";
import {useNavigation} from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Inclu-Go"},
    {name: "description", content: "Better life for everyone!"},
  ];
}

export default function Home() {
  return <main className="bg-main p-4 grid justify-center gap-4">
    <div>Test</div>
  </main>
}
