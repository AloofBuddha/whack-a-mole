import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './app/reducer.js';
import App from './app/components/App.js';
import './app/tests.js';

// Configurable
const gameLength = 30000; // 30s
const roundLength = 1000; // the time in between new moles popping up

const store = createStore(reducer);
// render on every store change
store.subscribe(render);
// render once, to begin
render();

function render() {
  ReactDOM.render(
    <App 
      state={store.getState()}
      onStart={startGame}
      onMoleClick={onMoleClick}
    />, 
    document.getElementById('app'));
}

function startGame() {
  const gameState = store.getState().gameState;
  const audio = new Audio('assets/whack.mp3');

  if (gameState !== 'started') {
    audio.play();
    store.dispatch({ type: 'GAMESTATE_START' });
  }
  
  triggerRound();

  // set a timeout to dispatch the 'game end' message
  setTimeout(() => {
    store.dispatch({ type: 'GAMESTATE_END' })
  }, gameLength);
}

function triggerRound() {
  const moles = store.getState().moles,
       roundLength = _.random(500, 2000),
       indexList = _.range(moles.length),
       molesThisRound = _.random(2, 5);

  // get a list of n random, unique indexes and trigger those moles
  setTimeout(() => {
    _.sampleSize(indexList, molesThisRound).map(triggerMole);
    triggerRound(); // trigger the next round
  }, roundLength);
}

function triggerMole(i) {
  // mole stays out between 1 and 5 seconds
  const moleOutLength = _.random(1000, 5000);

  store.dispatch({ type: 'MOLE_COMES_OUT', index: i });
  
  // set a timeout to dispatch the 'mole goes in' message
  setTimeout(() => 
    store.dispatch({ type: 'MOLE_GOES_IN', index: i }), 
  moleOutLength);
}

function onMoleClick(index) {
  const audio = new Audio('assets/whack.mp3');

  return function () {
    // only send the message if clicked mole is currently out
    if (store.getState().moles[index].isOut) {
      audio.play();
      store.dispatch({ type: 'MOLE_HIT', index: index });
    }
  }
}