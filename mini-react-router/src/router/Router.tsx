import { BrowserHistory } from 'history';
import React, { useState , useEffect, useMemo } from 'react';
import RouterContext from './routerContext';

interface IProps {
    history: BrowserHistory;
    children: React.ReactChildren;
}

export default function Router(props: IProps) {
    const {history, children} = props;
    const [location, setLocation] = useState(history.location);
    const unListen = useMemo(() => history.listen(({ location }) => {
        setLocation(location)
    }), [history])

    useEffect(() => {
        return () => {
            if(unListen) {
                unListen();
            }
        }
    }, [unListen])

    return (
        <RouterContext.Provider
            value={{
                history,
                location
            }}
        >
            {children}
        </RouterContext.Provider>
    )
};