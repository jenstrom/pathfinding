import { level } from './level';

export type point = {x: number, y: number};

type node = { position: point, distanceFromStart: number, supposedDistanceFromTarget: number, parent: node }

const directions: point[] = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
]

let start: point = {x:0, y:0};
let target: point = {x:0, y:0};

export const setPoints = {
    setStart: (x:number, y: number) => {start.x = x; start.y = y},
    setTarget: (x:number, y: number) => {target.x = x; target.y = y}
}

export const findPath = () => pathFinder(start, target, level);

const pathFinder = (start: point, target: point, level?: number[][]):point[] => 
    !level || pointIsValid(start, level) && pointIsValid(target, level) ?
    getNodeAncestry(
        [findTarget(
            [createNodeWithTarget(start, 0, null, target)], target, level)
        .pop()]
    )
    .map(n => n.position).reverse() : 
    [];

const findTarget = (openList: node[], target: point, level?: number[][], closedList:node[] = [], loops = 0): node[] => 
    pointsAreEqual(openList[0].position, target) || !pointIsValid(openList[0].position, level) || loops === 1000 ?
    closedList.concat(openList[0]) :
    findTarget(
        openList.concat(
            getChildNodes(openList[0], target)
            .filter(c => 
                nodeHasValidPos(c, level) &&
                nodePosIsNotInLists(c, [closedList, openList])
            )
        )
        .map(n => 
            currentNodeIsBetterParent(openList[0], n) ?
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

const pointsAreEqual = (point1: point, point2: point): boolean => 
    point1.x === point2.x && 
    point1.y === point2.y;

const pointIsValid = (point: point, level?: number[][]) => 
    !level || 
    !(point.x < 0) && 
    !(point.y < 0) && 
    !(point.x >= level[0].length) && 
    !(point.y >= level.length) && 
    getTileTypeOfPoint(point, level);

const pointsAreValid = (points: point[], level?: number[][]) => 
    level && points.length ? 
    pointIsValid(points.shift(), level) && 
    pointsAreValid(points, level) : 
    true;

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

const getChildNodes = (node: node, target: point): node[] =>
    directions.map(d => createNodeWithTarget(
        addPoints(node.position, d),
        node.distanceFromStart + 1,
        node,
        target
    ));

const nodeHasValidPos = (node: node, level: number[][]) => !level || level[node.position.y][node.position.x];

const nodePosIsNotInList = (node: node, list: node[]) => !list || !list.some(n => pointsAreEqual(n.position, node.position));

const nodePosIsNotInLists = (node: node, list: node[][]) => 
    list.length ? 
    nodePosIsNotInList(node, list[0]) && 
    nodePosIsNotInLists(node, list.slice(1)) : 
    true;

const currentNodeIsBetterParent = (currentNode: node, potentialChild: node) => 
    pointsAreAdjacent(currentNode.position, potentialChild.position) &&
    potentialChild.parent.distanceFromStart > currentNode.distanceFromStart;