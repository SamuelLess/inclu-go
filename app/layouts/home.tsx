import React from "react";
import { NavLink, Outlet } from "react-router";
import { obstacles } from "../Map/obstacles";


export default function Home() {
  return (
    <div>
        <main className="bg-main h-screen max-w-[390px] max-h-[800px] mx-auto">
          <Outlet />
        </main>
    </div>
  );
}
