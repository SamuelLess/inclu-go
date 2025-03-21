import Map from "~/Map/Map";
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Inclu-Go"},
    {name: "description", content: "Better life for everyone!"},
  ];
}
export default function Home() {
  return <div>
    <div className="border border-cyan-700 h-[85vh] w-full"> 
      <Map />
    </div>
  </div> /*
  <main className="bg-main p-4 grid justify-center gap-4">
    <div>Test NR 3</div>
  </main>*/
}
