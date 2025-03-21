import {NavLink, Outlet} from "react-router";

export default function Home() {
  return (
    <div>
      <main className="bg-main p-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <NavLink to='/'>Inclu-Go :)</NavLink>
        </h2>
        <Outlet/>
      </main>
    </div>
  );
}
