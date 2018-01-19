export class Point {
    public readonly x: number;
    public readonly y: number;
    constructor(x: number, y: number){
        this.x = x || 0;
        this.y = y || 0;
    }
}