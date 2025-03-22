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
    {// Bild ergänzen ?
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
        "type": "path",
        "features": [1, 0.1, 0, 0.8]
    },
    {//Bild ergänzen
        "name": "bahnhofNord",
        "img": '/obstacles/wheelchair.webp',
        "desc": "",
        "coords": [
            [52.394807,13.128327],
            [52.394845,13.128676],
            [52.394734,13.128702],
            [52.394707,13.128378]
        ],
        "type": "stairs",
        "features": [1, 0.6, 0.3, 0]
    },
    {// Bild ergänzen? 
        "name": "hpiWald",
        "img": '/obstacles/wheelchair.webp',
        "desc": "",
        "coords": [
            [52.393494, 13.122922],
            [52.393625, 13.124151],
            [52.393776, 13.126672],
            [52.392922, 13.126339],
            [52.392853, 13.123105]
        ],
        "type": "path",
        "features": [1, 0.1, 0, 0.8]
    },
    {// Bild ergänzen
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
    },
    {//Bild ergänzen
        "name": "TreppeAmWeg",
        "img": '/obstacles/wheelchair.webp',
        "desc": "",
        "coords": [
            [52.393797,13.127356],
            [52.393804,13.127718],
            [52.393740,13.127699],
            [52.393745,13.127305]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.1, 0.5]
    },{//alles neu austauschen
        "name": "",
        "img": '/obstacles/wheelchair.webp',
        "desc": "",
        "coords": [
            [geo:52.392637,13.124813?z=19],
            [geo:52.392635,13.124958?z=19],
            [52.393740,13.127699],
            [52.393745,13.127305]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.1, 0.5]
    },





];

export type SwipeObstacleObject = {
    image_name: string;
    features: number[];
};

// Die Objekte beim Swipen
export const swipeObstacles: SwipeObstacleObject[] = [
    
]