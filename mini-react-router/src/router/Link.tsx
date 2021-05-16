import { BrowserHistory } from 'history';
import React, { useState, useEffect, useContext } from 'react';
import RouterContext, {RouterContextProps} from './routerContext';

interface IProps extends RouterContextProps {
    children: React.ReactChildren;
    to: string
}

export default function Link(props: IProps) {
    const {children, to} = props;
    const { history, location } = useContext(RouterContext);

    function onClick(event: React.MouseEvent) {
        event.preventDefault();
        history.push(to);
    }

    return (
        <a href={to} onClick={onClick}>
            {children}
        </a>
    )
};