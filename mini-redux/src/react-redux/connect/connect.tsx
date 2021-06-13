import React, {useState, useEffect, useContext} from 'react';
import Context from '../components/Context';

interface MapStateToProps {
    (state: any): {}
}

interface MapDispatchToProps {
    (dispatch: any): {}
}

export default function connect(mapStateToProps?: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) {
    return function connectWrapper(WrappedComponent: any) {
        return function() {
            const {store} = useContext(Context);
            const [mapState, setMapState] = useState(mapStateToProps ? mapStateToProps(store?.getState()) : {});
            const [mapDispatch, setMapDispatch] = useState(mapDispatchToProps ? mapDispatchToProps(store?.dispatch) : {});

            useEffect(() => {
                const unSub = store?.subscribe(() => {
                    if(mapStateToProps) {
                        const newState = mapStateToProps(store.getState());
                        setMapState(newState);
                    }
                })

                return () => {
                    unSub && unSub();
                }
            }, )

            return (
                <WrappedComponent {...mapState} {...mapDispatch} />
            )
        }
    }
}