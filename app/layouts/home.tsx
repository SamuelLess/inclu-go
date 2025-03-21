import {NavLink, Outlet} from "react-router";

export default function Home() {
  return (
    <div>
      <main className="bg-main h-screen max-w-[390px] max-h-[800px] mx-auto">
        <Outlet/>
      </main>
    </div>
  );
}
