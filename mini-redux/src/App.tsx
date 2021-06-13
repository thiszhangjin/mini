import React, {useState, useEffect} from "react";
import {connect} from './react-redux';
import {IState} from './store';

interface State {
  counterReducer: IState<number>;
  inputReducer: IState<string>;
}

interface IProps {
  count: State['counterReducer'],
  input: State['inputReducer'],
  handleIncremented: () => void,
  handleDecremented: () => void,
  onInput: (value: string) => void;
}

function mapStateToProps(state: State) {
  return {
    count: state.counterReducer,
    input: state.inputReducer
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleIncremented: () => dispatch({
      type: 'incremented'
    }),
    handleDecremented: () => dispatch({
      type: 'decremented', 
      payload: {
        value: 2
      }
    }),
    onInput: (value: string) => dispatch({
      type: 'setValue',
      payload: {
        value
      }
    }),
  }
}
 

function App(props: IProps) {

  function handleIncremented() {
    props.handleIncremented();
  }

  function handleDecremented() {
    props.handleDecremented();
  }

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    props.onInput(event.target.value);
  }

  return (
    <div>
      <h2>Home</h2>
      <p>count: {props.count.value}</p>
      <button onClick={handleIncremented}>incremented</button>
      <button onClick={handleDecremented}>decremented</button>
      <div>-------------------------------------------</div>
      <input onChange={onInput}/>
      <p>input: {props.input.value}</p>
      <div>-------------------------------------------</div>
      <p>props: {JSON.stringify(props)}</p>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)