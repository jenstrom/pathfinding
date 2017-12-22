import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { level } from './constants/level';
import Main from './components/main';

ReactDOM.render(
    <Main level={level}/>,
    document.getElementById('content') as HTMLElement
);