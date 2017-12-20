import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { level } from './level';
import Main from './main';

ReactDOM.render(
    <Main level={level}/>,
    document.getElementById('content') as HTMLElement
);