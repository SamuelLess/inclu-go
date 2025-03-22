import React from "react";
import { NavLink, Outlet } from "react-router";
import { obstacles } from "../Map/obstacles";

export const GlobalContext = React.createContext<
  | {
      severeties: number[];
      setSevereties: React.Dispatch<React.SetStateAction<number[]>>;
    }
  | null
>(null);

export default function Home() {

  const [severeties, setSevereties] = React.useState(obstacles.map((obstacle) => 0));

  return (
    <div>
      <GlobalContext.Provider value={{ severeties, setSevereties }}>
        <main className="bg-main h-screen max-w-[390px] max-h-[800px] mx-auto">
          <Outlet />
        </main>
      </GlobalContext.Provider>
    </div>
  );
}
