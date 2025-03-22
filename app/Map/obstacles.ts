export type ObstacleObject = {
    name: string;
    desc: string;
    img: string;
    coords: [number, number][];
    type: "stairs" | "path" | "elevator" | "slope";
    features: number[];
};

// features: (0: accessible, 1: inaccessible)
// 0: wheelchair accessible
// 1: ascent (energy)
// 2: crowdedness
// 3: Accessebility to blind people

// Die Hindernisse beim HPI
export const obstacles : ObstacleObject[] = [
    {
        "name": "HPI-Park",
        "desc": "Desription",
        "img": '/obstacles/wheelchair.webp',
        "coords": [
            [52.392179, 13.125551],
            [52.392201, 13.125975],
            [52.391852, 13.125859],
            [52.391763, 13.126439],
            [52.391706, 13.126417],
            [52.391696, 13.125545]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.3, 0]
    },
    {
        "name": "bahnhofNord",
        "img": '/obstacles/wheelchair.webp',

        "desc": "",
        "coords": [
            [52.394697, 13.127005],
            [52.394729, 13.127321],
            [52.394548, 13.127393],
            [52.394499, 13.127090]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.3, 0]
    },{
        "name": "hpiWald",
        "img": '/obstacles/wheelchair.webp',

        "desc": "",
        "coords": [
            [52.393494, 13.122922],
            [52.393625, 13.124151],
            [52.393776, 13.126672],
            [52.392922, 13.126339],
            [52.392817, 13.123051]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.3, 0]
    },
    {
        "name": "haus1Treppe",
        "img": '/obstacles/wheelchair.webp',

        "desc": "",
        "coords": [
            [52.392834,13.126830],
            [52.392800,13.127093],
            [52.392650,13.127055],
            [52.392681,13.126787]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.3, 0]
    }





];

export type SwipeObstacleObject = {
    image_name: string;
    features: number[];
};

// Die Objekte beim Swipen
export const swipeObstacles: SwipeObstacleObject[] = [
    
]