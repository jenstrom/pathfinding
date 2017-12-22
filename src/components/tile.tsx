import * as React from 'react';
import { tileColors } from '../constants/colors';
import { setPoints } from '../pathfinding/pathfinder';

export default ({tileType, x, y, pfCallBack}: {tileType: number, x:number, y: number, pfCallBack: () => void}): JSX.Element => 
    <td 
    style={{ width: 50, backgroundColor: tileColors[tileType] }}
    onClick={() => {setPoints.setStart(x, y); pfCallBack()}}
    onContextMenu={(e) => { e.preventDefault(); setPoints.setTarget(x, y); pfCallBack() }}
    />