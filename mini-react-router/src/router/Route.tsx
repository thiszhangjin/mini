import React, { useState, useEffect, useContext } from 'react';
import RouterContext, {RouterContextProps} from './routerContext';
import {pathToRegexp} from "path-to-regexp";

interface IProps extends RouterContextProps {
    children: React.ReactChildren;
    path: string;
    exact?: boolean;
    component?: any;
    render: () => React.ReactElement
}

export default function Route(props: IProps) {
    const { path, exact = false, component,render, children} = props;
    const { history, location } = useContext(RouterContext);
    const [match, setMatch] = useState<boolean>(false);
    const [params, setParams] = useState<{}>({});

    useEffect(() => {
        const {pathname} = location;
        const keys: any[] = [];
        const re = pathToRegexp(path, keys,  {
            end: exact,
          }); 
        const match = re.exec(pathname);
        if(Array.isArray(match)) {
            const [url, ...values] = match;
            const params = keys.reduce((memo, key, index) => {
                memo[key.name] = values[index];
                return memo;
              }, {});
            setMatch(exact ? url === pathname : true);
            setParams(params);
        } else {
            setMatch(false);
            setParams({});
        }
    }, [location, path, exact])

    return (
        <RouterContext.Provider value={{
            path,
            params,
            history, 
            location,        
        }}>
            {match ? 
                children ?
                    children 
                        : component ?
                            React.createElement(component)
                            : render ?
                        render()
                    : null
                : null}
        </RouterContext.Provider>
    )
};