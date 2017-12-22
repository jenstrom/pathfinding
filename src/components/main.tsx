import * as React from 'react';
import { findPath, point, setPoints } from '../pathfinding/pathfinder';
import Row from './row';

export interface IMainState {
    path: point[];
}

export interface IMainProps {
    level: number[][];
}

export class MainComponent extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            path: []
        };
    }

    public render(){
        return <table>
            <tbody>
                {this.props.level.map((v, i) => 
                <Row tileList={v} path={this.state.path} y={i} pfCallBack={() => this.triggerPathFinder()} key={i} />)}
            </tbody>
        </table>;
    }

    private triggerPathFinder(){
        this.setState({
            path: findPath()
        });
    }
}

export default MainComponent;