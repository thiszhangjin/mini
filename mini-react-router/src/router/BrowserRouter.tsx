import { createBrowserHistory } from 'history';
import React from 'react';
import Router from './Router';

interface IProps {
    children: React.ReactChildren
}

export default function BrowserRouter(props: IProps) {
    let history = createBrowserHistory();
    const {children} = props;

    return (
        <Router history={history} children={children} />
    )
};