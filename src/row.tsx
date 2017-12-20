import * as React from 'react';
import { point } from './pathfinder';
import Tile from './tile';

export default ({tileList, path, y, pfCallBack}: {tileList: number[], path: point[], y: number, pfCallBack: () => void }): JSX.Element => 
    <tr 
    style={{height: 50}}>
        {tileList.map((v, i) => <Tile tileType={path.some(v => v.x === i && v.y === y) ? 2 : v} x={i} y={y} pfCallBack={pfCallBack} key={i}/>)}
    </tr>