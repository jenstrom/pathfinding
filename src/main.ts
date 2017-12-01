type point = {x: number, y: number};

type node = { position: point, distanceFromStart: number, supposedDistanceFromTarget: number, parent: node }

const map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,0,1,1,1,1,1,0],
    [0,1,1,0,0,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
];

const pathFinder = (start: point, target: point):point[] => 
    getNodeAncestry([last(
        findTarget(
            [createNodeWithTarget(start, 0, null, target)], target)
        )])
        .map(n => n.position).reverse();

const findTarget = (closedList: node[], target: point, openList:node[] = [], loops = 0): node[] => {
    if (pointsAreEqual(last(closedList).position, target) || loops === 1000){
        console.log(loops);
        return closedList;
    }
    openList = openList.concat(
        getChildNodes(last(closedList), target).filter(c => 
            !closedList.some(n => pointsAreEqual(n.position, c.position)) ||
            !openList.some(n => pointsAreEqual(n.position, c.position))
        )
    );
    openList = openList.map(n => 
        n.parent.distanceFromStart > last(closedList).distanceFromStart ?
        createNodeWithTarget(n.position, last(closedList).distanceFromStart + 1, last(closedList), target) :
        n
    );
    return findTarget(closedList.concat(
        openList.sort((n1, n2) => n1.supposedDistanceFromTarget - n2.supposedDistanceFromTarget)[0]),
        target,
        openList.slice(1),
        loops+1
    );
};

const getNodeAncestry = (nodes: node[]):node[] => last(nodes).parent ? getNodeAncestry(nodes.concat(last(nodes).parent)) : nodes;

const pointsAreEqual = (point1: point, point2: point): boolean => point1.x === point2.x && point1.y === point2.y;

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


const drawGrid = (grid: HTMLTableElement, map: number[][]): void => {
    map.forEach(v => {
        let row = grid.appendChild(createTr());
        v.forEach(c => row.appendChild(createTd(c)));
    });
}

const drawPath = (moves: point[]) => grid.children ?
    moves.forEach(p => 
        changeColor(
            grid.children[p.y].children[p.x] as HTMLTableDataCellElement, 2
        )
    ) : ''

drawGrid(grid, map);
drawPath(pathFinder({x: 0, y:0}, {x: 4, y:7}));
console.log(pathFinder({x: 0, y:0}, {x: 4, y:7}));
let pos1: point = {x: 12, y: 12};
let pos2: point = {x: 12, y: 12};
console.log(pointsAreEqual(pos1, pos2));