import React from 'react';
import Context from './Context';
import {Store} from '../../redux/interface';

interface IProps {
    store: Store;
    children: React.ReactChild;
}

export default function Provider(props: IProps){
    const {store, children} = props;

    return (
        <Context.Provider value={{store}}>
            {children}
        </Context.Provider>
    )
}