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
        return function(props: any) {
            const {store} = useContext(Context);
            const [mapState, setMapState] = useState(mapStateToProps ? mapStateToProps(store?.getState()) : {});
            const [mapDispatch] = useState(mapDispatchToProps ? mapDispatchToProps(store?.dispatch) : {});

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
                <WrappedComponent {...props} {...mapState} {...mapDispatch} />
            )
        }
    }
}