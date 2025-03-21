import type { LatLngExpression } from 'leaflet';

const BASE_URL = "http://localhost:8080/ors/v2/directions/foot-walking";
const get_url = () => `${BASE_URL}/${}, ${}, ${}`;

const polygons: LatLngExpression[][] = [
    [
        [52.389, -13.129],
        [52.392, -13.127],
        [52.395, -13.14]
    ],
    [
        [52.37, -13.134],
        [52.34, -13.123],
        [52.342, -13.12]
    ],
];

