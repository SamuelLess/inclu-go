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
    {//wir haben kein Bild
        "name": "Treppe",
        "img": 'pictures/white.webp',
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
    {//zwei Treppen
        "name": "Treppe",
        "img": '/pictures/zweiTreppen.webp',
        "desc": "Zwei Treppen, es gibt einen einfachen, minimalen Umweg ohne Stufen.",
        "coords": [
            [52.393797,13.127356],
            [52.393804,13.127718],
            [52.393740,13.127699],
            [52.393745,13.127305]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0.1, 0.5]
    },
    {//Flatterband nahe der Bushaltestelle
        "name": "Flatterband",
        "img": '/pictures/kleineBaustelle.webp',
        "desc": "Ein Stück vom Gehweg ist vorübergehend mit Flatterband abgesperrt wegen Bauarbeiten.",
        "coords": [
            [52.393882,13.128509],
            [52.393877,13.128633],
            [52.393825,13.128635],
            [52.393823,13.128533]
        ],
        "type": "path",
        "features": [0, 0, 0, 1]
    },
    {// nicht eingezeichnete Treppe
        "name": "Treppe",
        "img": '/pictures/unbekanntetreppe.webp',
        "desc": "",
        "coords": [
            [52.392444,13.124309],
            [52.392447,13.124325],
            [52.392426,13.124330],
            [52.392424,13.124309]
        ],
        "type": "stairs",
        "features": [1, 0.2, 0, 0]
    },
    {// kurzer Sandweg
        "name": "unbefestiger Weg",
        "img": '/pictures/kurzerSandweg.webp',
        "desc": "Das Wegstück ist nicht befesttig mit sehr sandiger Erde.",
        "coords": [
            [52.392403,13.128912],
            [52.392287,13.129097],
            [52.392251,13.129038],
            [52.392337,13.128847]
        ],
        "type": "path",
        "features": [1, 0.3, 0, 0.3]
    },
    {//schmales Pflaster
        "name": "schmaler Pflastersteinweg",
        "img": '/pictures/schmalesPflaster.webp',
        "desc": "Das Pflasterwegstück ist sehr schmal.",
        "coords": [
            [52.393118,13.128810],
            [52.392951,13.129102],
            [52.392894,13.129062],
            [52.393008,13.128826]
        ],
        "type": "path",
        "features": [0.8, 0.1, 0, 0.2]
    },
    {// Bhf Treppe nord
        "name": "lange Treppe ohne Alternativweg",
        "img": '/pictures/bhftreppenord.webp',
        "desc": "Lange Treppe zum Nordausgang vom Bahnhof Griebnitzsee. Es gibt keinen Fahrstuhl oder andere direkte alternative.",
        "coords": [
            [52.394789,13.128453],
            [52.394803,13.128536],
            [52.394725,13.128549],
            [52.394712,13.128477]
        ],
        "type": "stairs",
        "features": [1, 0.8, 0, 0]
    },
    {// Bhf Fahrstuhl bsp
        "name": "Fahrstuhl",
        "img": '/pictures/bhfaufzug.webp',
        "desc": "",
        "coords": [
            [52.394201,13.128614],
            [52.394205,13.128681],
            [52.394169,13.128684],
            [52.394169,13.128630]
        ],
        "type": "elevator",
        "features": [0, 0, 0.3, 0]
    },
    {// große Baustelle 
        "name": "Baustelle",
        "img": '/pictures/grosseBaustelle.webp',
        "desc": "",
        "coords": [
            [52.392807,13.125441],
            [52.392823,13.126294],
            [52.392740,13.126262],
            [52.392727,13.125441]
        ],
        "type": "path",
        "features": [0.2, 0, 0.1, 0.9]
    },
];