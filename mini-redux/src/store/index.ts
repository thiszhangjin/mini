import {createStore, combineReducers, applyMiddleware} from '../redux';
import {Reducer, Middleware} from '../redux/interface';
import thunk from '../redux-thunk';

export interface IState<T> {
    value: T
}

const counterReducer: Reducer<IState<number>> = function(state = { value: 0 }, action) {
    switch (action.type) {
        case 'incremented':
            return { value: state.value + 1 }
        case 'decremented':
            return { value: state.value - action.payload.value }
        default:
            return state
    }
}

const inputReducer: Reducer<IState<string>> = function(state = { value: '' }, action) {
    switch (action.type) {
        case 'setValue':
            return { value: action.payload.value }
        default:
            return state
    }
}

const reducer = combineReducers({
    counterReducer,
    inputReducer
});


const timeMiddleware:Middleware = (store) => (next) => (action) => {
    console.log('timeMiddleware', action);
    next(action);
  }

const loggerMiddleware:Middleware = (store) => (next) => (action) => {
    console.log('loggerMiddleware', action);
    next(action);
    console.log('loggerMiddleware state', store.getState());
}

const exceptionMiddleware:Middleware = (store) =>  (next) => (action) => {
    try {
        console.log('error check')
        next(action);
    } catch (err) {
        console.error('错误报告: ', err)
    } 
}

const rewriteCreateStoreFunc = applyMiddleware(thunk, exceptionMiddleware, timeMiddleware, loggerMiddleware);

const store = createStore(reducer, {}, rewriteCreateStoreFunc);


export default store;