import React from "react";
import { NavLink, Outlet } from "react-router";
import { obstacles } from "../Map/obstacles";


export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[880px] w-[420px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[390px] h-[840px] bg-white dark:bg-gray-800">

          <main className="bg-main h-screen max-w-[390px] max-h-[840px] mx-auto">
          <Outlet />

      </main>
        </div>
      </div>
    </div>
  );
}
