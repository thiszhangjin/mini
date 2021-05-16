import { BrowserHistory } from 'history';
import React, { useState, useEffect, useContext } from 'react';
import RouterContext, {RouterContextProps} from './routerContext';

interface IProps extends RouterContextProps {
    children: React.ReactChildren;
    path?: string;
    exact?: boolean;
    render: () => React.ReactElement
}

export default function Route(props: IProps) {
    const { path, exact, render, children, ...reset} = props;
    const { history, location } = useContext(RouterContext);
    const [match, setMatch] = useState<boolean>(false);

    useEffect(() => {
        const {pathname} = location;
        if(pathname === path) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    }, [location, path, exact])

    return (
        <div {...reset}>
            {match && children}
        </div>
    )
};