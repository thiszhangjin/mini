import React, {useState} from "react";
import Animate from './animate';

import './App.css'

const Div = (props) => {
  const { style, show, ...restProps } = props;
  const newStyle = { ...style, display: show ? '' : 'none' };
  return <div {...restProps} style={newStyle}/>;
};

export default function App() {

  const [showChild, setShowChild] = useState(true)

  function handleChangeShow() {
    setShowChild((showChild) => {
      return !showChild;
    })
  }

  return (
    <div className="app">
      <button onClick={handleChangeShow}>{showChild ? 'hide' : 'show'}</button>
      <Animate showProp="show" transitionName="fade">
        <Div show={showChild} className="child"></Div>
      </Animate>
    </div>
  );
}
