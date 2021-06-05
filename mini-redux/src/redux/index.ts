import {Listener, Action, Reducer, RewriteCreateStore, Dispatch, Subscribe , Unsubscribe, CreateStore, CombineReducers, Reducers, Middleware, ApplyMiddleware} from './interface';

const createStore: CreateStore = function<S>(reducer: Reducer<S>, initState?: S, rewriteCreateStore?: RewriteCreateStore<S>) {
    if(rewriteCreateStore){
        return rewriteCreateStore(createStore, reducer, initState);
    }

    let state: S = initState as S;
    const listeners: Listener[] = [];

    function getState(): S {
        return state;
    }


    const dispatch: Dispatch = function (action: Action) {
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    const subscribe: Subscribe =  function (listener: Listener) {
        listeners.push(listener);

         const unsubscribe: Unsubscribe = function() {
            const index: number = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }

        return unsubscribe
    }

    // 初始化
    dispatch({type: Symbol()});
    
    return {
        getState,
        dispatch,
        subscribe
    }
}


const combineReducers: CombineReducers = function(reducers: Reducers) {
    return function(state = {}, action: Action):any {
        Object.keys(reducers).forEach(key => {
            const reducer: Reducer<any> = reducers[key];
            state[key] = reducer(state[key], action);
        })
        return state;
    }
}

const applyMiddleware: ApplyMiddleware = function(...middlewares: Middleware[]) {
    return function<S>(createStore: CreateStore, reducer: Reducer<S>, initState?: S) {
        const store = createStore(reducer, initState);
        
        const chain: any[] = middlewares.map((middleware: any) => middleware({ 
            getState: store.getState 
        }));

        store.dispatch = compose(chain)(store.dispatch);

        return store;
    }
}

function compose(chain: any[]) {
    if (chain.length === 1) {
      return chain[0]
    }
    return chain.reduce((a:any, b:any) => {
        return (args:any) => a(b(args))
    })
}

export {createStore, combineReducers, applyMiddleware};