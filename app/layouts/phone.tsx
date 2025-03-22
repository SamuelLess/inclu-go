import "./slayphone.css";
import { NavLink, Outlet } from "react-router";

export default function Phone() {
    return (<> 
        <img src="device_Port-TitaniumBlack.png">
        <main className="bg-main h-screen max-w-[1852px] max-h-[3518px] mx-auto">
          <Outlet />
        </main>
        </img>
    </>)
}