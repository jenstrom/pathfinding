type point = {x: number, y: number};

type node = { position: point, distanceFromStart: number, supposedDistanceFromTarget: number, parent: node }

const level = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,1,1,1,1,1,0],
    [0,1,1,1,1,0,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,0,1,1,1,1,1,0],
    [0,1,0,0,0,1,1,0,1,0],
    [0,1,0,1,1,1,1,0,1,0],
    [0,1,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
];

let start: point = {x:0, y:0};
let target: point = {x:0, y:0};
let settingStart = true;

const setStartX = (x: number) => { start.x = x };
const setStartY = (y: number) => { start.y = y };
const setTargetX = (x: number) => { target.x = x };
const setTargetY = (y: number) => { target.y = y };

const pathFinder = (start: point, target: point, level?: number[][]):point[] => 
!level || pointIsValid(start, level) && pointIsValid(target, level) ?
    getNodeAncestry([last(
        findTarget(
            [createNodeWithTarget(start, 0, null, target)], target, level)
        )])
        .map(n => n.position).reverse() : [];

const findTarget = (openList: node[], target: point, level?: number[][], closedList:node[] = [], loops = 0): node[] => 
    pointsAreEqual(openList[0].position, target) || loops === 1000 || !pointIsValid(openList[0].position, level) ?
    closedList.concat(openList[0]) :
    findTarget(
        openList.concat(
            getChildNodes(openList[0], target).filter(c => 
                (!level || level[c.position.y][c.position.x] !== 0) &&
                (!closedList.some(n => pointsAreEqual(n.position, c.position)) ||
                !openList.some(n => pointsAreEqual(n.position, c.position)))
            ))
        .map(n => 
            pointsAreAdjacent(n.position, openList[0].position) &&
            n.parent.distanceFromStart > openList[0].distanceFromStart ?
            createNodeWithTarget(n.position, openList[0].distanceFromStart + 1, openList[0], target) :
            n)
        .slice(1)
        .sort((n1, n2) => n1.supposedDistanceFromTarget - n2.supposedDistanceFromTarget),
        target,
        level,
        closedList.concat(openList[0]),
        loops+1
    );


const getNodeAncestry = (nodes: node[]):node[] => last(nodes).parent ? getNodeAncestry(nodes.concat(last(nodes).parent)) : nodes;

const pointsAreAdjacent = (point1, point2) => directions.some(d => pointsAreEqual(addPoints(point1, d), point2));

const pointsAreEqual = (point1: point, point2: point): boolean => point1.x === point2.x && point1.y === point2.y;

const pointIsValid = (point: point, level?: number[][]) => !level || !(point.x < 0) && !(point.y < 0) && !(point.x >= level[0].length) && !(point.y >= level.length) && getTileTypeOfPoint(point, level);

const getTileTypeOfPoint = (point: point, level: number[][]) => level[point.y][point.x];

const last = (array) => array[array.length - 1];

const getDistanceBetweenPoints = (point1: point, point2: point): number =>
    Math.abs(point1.y - point2.y) +
    Math.abs(point1.x - point2.x);

const createNodeWithTarget = (position: point, distanceFromStart: number, parent: node, target: point): node => {
    return {
        position, 
        distanceFromStart, 
        supposedDistanceFromTarget: distanceFromStart + getDistanceBetweenPoints(position, target), 
        parent
    }
};

const addPoints = (point1: point, point2: point): point => { 
    return {
        x: point1.x + point2.x, 
        y: point1.y + point2.y
    } 
};

const directions: point[] = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
]

const getChildNodes = (node: node, target: point): node[] =>
    directions.map(d => createNodeWithTarget(
        addPoints(node.position, d),
        node.distanceFromStart + 1,
        node,
        target
    ));

const tileColors = [
    'green',
    'red',
    'yellow'
];

const getElement = (id: string):HTMLElement => document.getElementById(id);

const createTr = (): HTMLTableRowElement => document.createElement('tr');
const createTd = (type: number): HTMLTableDataCellElement => {
    let td = document.createElement('td');
    td.classList.add(tileColors[type]);
    return td;
}
const changeColor = (td: HTMLTableDataCellElement, type: number) => td.className = tileColors[type];
const grid: HTMLTableElement = getElement('grid') as HTMLTableElement;


const drawGrid = (grid: HTMLTableElement, level: number[][]): void => {
    grid.innerHTML = '';
    level.forEach((v, i) => {
        let tr = createTr();
        tr.addEventListener('click', () => settingStart ? setStartY(i) : setTargetY(i));
        let row = grid.appendChild(tr);
        v.forEach((c, j) => {
            let td = createTd(c);
            td.addEventListener('click', () => settingStart ? setStartX(j) : setTargetX(j));
            row.appendChild(td)});
    });
}

const drawPath = (moves: point[]) => grid.children ?
    moves.forEach(p => 
        changeColor(
            grid.children[p.y].children[p.x] as HTMLTableDataCellElement, 2
        )
    ) : ''


getElement('set').addEventListener('click', () => {
    settingStart = !settingStart;
    getElement('set').innerText = settingStart ? 'set end' : 'set start';
});

getElement('go').addEventListener('click', () => {
    drawGrid(grid, level);
    let x1: number = parseInt((getElement('x1') as HTMLInputElement).value);
    let y1: number = parseInt((getElement('y1') as HTMLInputElement).value);
    let x2: number = parseInt((getElement('x2') as HTMLInputElement).value);
    let y2: number = parseInt((getElement('y2') as HTMLInputElement).value);
    x1 && y1 && x2 && y2 ?
    drawPath(pathFinder({x: x1, y:y1}, {x: x2, y:y2}, level)) :
    drawPath(pathFinder(start, target, level));
});

drawGrid(grid, level);
// drawPath(pathFinder({x: 1, y:1}, {x: 2, y:2}, level));
// console.log(pathFinder({x: 1, y:1}, {x: 4, y:7}, level));