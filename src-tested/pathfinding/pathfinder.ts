import { Point } from "../models/point";

export const pathfinder = (startPoint: Point, endPoint: Point) => {
    if (!(startPoint instanceof Point)){
        throw(new Error('startPoint must be instanceof Point'));
    }
    if (!(endPoint instanceof Point)){
        throw(new Error('endPoint must be instanceof Point'));
    }
    return [];
}