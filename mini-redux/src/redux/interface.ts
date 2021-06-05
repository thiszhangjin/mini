export interface voidFun {
    (): void
}

export type Listener = voidFun;

export type Unsubscribe = voidFun;

export interface Action<T = any> {
    type: T;
    [extraProps: string]: any
}

export interface Reducer<S> {
    (state: S, action: Action): S
}

export interface RewriteCreateStore<S>{
    (createStore: CreateStore, reducer: Reducer<S>, initState?: S): Store
}

export interface Dispatch {
    (action: Action): void
}

export interface Subscribe {
    (listener: Listener): Unsubscribe
}

export interface Store<S = any> {
    getState: S;
    dispatch: Dispatch;
    subscribe: Subscribe;
}

export interface CreateStore {
    <S>(reducer: Reducer<S>, initState?: S, rewriteCreateStore?: RewriteCreateStore<S>): Store
} 

export interface Reducers {
    [key: string]: Reducer<any>
}

export interface CombineReducers {
    (reducers: Reducers): Reducer<{}>
}

export interface Middleware {
    (store: Store): (next: any) => (action: any) => any
}

export interface ApplyMiddleware {
    (...middlewares: Middleware[]): any
}
