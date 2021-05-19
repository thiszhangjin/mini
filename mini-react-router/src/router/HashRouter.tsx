import { createHashHistory } from 'history';
import React from 'react';
import Router from './Router';

interface IProps {
    children: React.ReactChildren
}

export default function HashRouter(props: IProps) {
    let history = createHashHistory();
    const {children} = props;

    return (
        <Router history={history} children={children} />
    )
};