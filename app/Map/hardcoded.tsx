import type { LatLngExpression } from 'leaflet';

export const hpiBuilding: LatLngExpression[] = [
    [52.391601, 13.123174],
    [52.391754, 13.131862],
    [52.394646, 13.134619],
    [52.393637, 13.122751],
];

export const HPI_POSITION: LatLngExpression = [52.3925, 13.128];
//52.3925132,13.12289

const hpiPark: LatLngExpression[] = [
    [52.392179, 13.125551],
    [52.392201, 13.125975],
    [52.391852, 13.125859],
    [52.391763, 13.126439],
    [52.391706, 13.126417],
    [52.391696, 13.125545]
]

const bahnhofNord: LatLngExpression[] = [
    [52.394697, 13.127005],
    [52.394729, 13.127321],
    [52.394548, 13.127393],
    [52.394499, 13.127090]
]

const hpiWald: LatLngExpression[] = [
    [52.393494, 13.122922],
    [52.393625, 13.124151],
    [52.393776, 13.126672],
    [52.392922, 13.126339],
    [52.392817, 13.123051]
]

const haus1Treppe: LatLngExpression[] = [
    [52.392834,13.126830],
    [52.392800,13.127093],
    [52.392650,13.127055],
    [52.392681,13.126787]
]

export const obstacles: LatLngExpression[][] = [hpiPark, hpiWald, bahnhofNord, haus1Treppe]

export const START:LatLngExpression = [52.391601, 13.133174];
export const END:LatLngExpression = [52.393637, 13.122751];