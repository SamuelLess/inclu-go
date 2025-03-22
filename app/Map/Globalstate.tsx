
export const GlobalContext = React.createContext<
    | {
        severeties: number[];
        setSevereties: React.Dispatch<React.SetStateAction<number[]>>;
        onMap: boolean;
        setOnMap: React.Dispatch<React.SetStateAction<boolean>>;
    }
    | null
>(null);

export const GlobalState = () => {

    const [severeties, setSevereties] = React.useState(obstacles.map((obstacle) => 0));


    return (
        <GlobalContext.Provider value={{ severeties, setSevereties }}>
            { }
        </GlobalContext.Provider>
    );