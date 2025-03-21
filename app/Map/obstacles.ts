export type ObstacleObject = {
    lat: number;
    lon: number;
    type: "stairs" | "path" | "elevator" | "slope";
};

export const obstacles : ObstacleObject[] = [
    {
        "lat": 52.39377,
        "lon": 13.1270193,
        "type": "stairs"
    },
    {
        "lat": 52.3925043,
        "lon": 13.1252781,
        "type": "path"
    }
];