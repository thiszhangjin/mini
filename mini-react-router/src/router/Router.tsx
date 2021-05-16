import { BrowserHistory } from 'history';
import React, { useState , useEffect } from 'react';
import RouterContext from './routerContext';

interface IProps {
    history: BrowserHistory;
    children: React.ReactChildren;
}

export default function Router(props: IProps) {
    const {history, children} = props;
    const [location, setLocation] = useState(history.location);
 
    const unListen = history.listen(({ location, action }) => {
        setLocation(location)
    })

    useEffect(() => {
        return () => {
            if(unListen) {
                unListen();
            }
        }
    }, [])

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