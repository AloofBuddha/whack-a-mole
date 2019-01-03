import React from 'react';
import ReactDOM from 'react-dom';
import store, { startGame, onMoleClick } from './store';
import App from './App';
import './index.css';

// REDUX CONFIG
store.subscribe(render);

// INITIAL RENDER
render();

// RENDER FUNCTION
function render() {
  ReactDOM.render(
    <App 
      state={store.getState()}
      onStart={startGame}
      onMoleClick={onMoleClick}
    />, 
    document.getElementById('root'));
}