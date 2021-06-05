import React, {useState, useEffect} from "react";
import store, {IState} from './store';

interface State {
  counterReducer: IState<number>;
  inputReducer: IState<string>;
}


export default function App() {
  const state: State = store.getState();
  const [count, setCount] = useState<IState<number>>(state.counterReducer);
  const [input, setInput] = useState<IState<string>>(state.inputReducer);

  useEffect(() => {
    store.subscribe(() => {
      setCount(state.counterReducer);
      setInput(state.inputReducer);
    })
  })

  function handleIncremented() {
    store.dispatch({
      type: 'incremented'
    })
  }

  function handleDecremented() {
    store.dispatch({
      type: 'decremented',
      payload: {
        value: 2
      }
    })
  }

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    store.dispatch({
      type: 'setValue',
      payload: {
        value: event.target.value
      }
    })
  }

  return (
    <div>
      <h2>Home</h2>
      <p>count: {count.value}</p>
      <button onClick={handleIncremented}>incremented</button>
      <button onClick={handleDecremented}>decremented</button>
      <div>-------------------------------------------</div>
      <input onChange={onInput}/>
      <p>input: {input.value}</p>
      <div>-------------------------------------------</div>
      <div>store</div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}