
import React, { createContext, useState } from "react";
import { obstacles } from "../Map/obstacles";
import Map from "../Map/Map";
import Swipe from "../components/swipe";

export const GlobalContext = createContext<
    | {
        severeties: number[];
        setSevereties: React.Dispatch<React.SetStateAction<number[]>>;
        onMap: boolean;
        setOnMap: React.Dispatch<React.SetStateAction<boolean>>;
    }
    | null
>(null);

export const GlobalState = () => {

    const [severeties, setSevereties] = useState(obstacles.map((obstacle) => 0));
    const [onMap, setOnMap] = useState(false);

    return (
        <GlobalContext.Provider value={{ severeties, setSevereties , onMap, setOnMap }}>
            { onMap ? <Map /> : <Swipe /> }
        </GlobalContext.Provider>
    );
}