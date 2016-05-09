import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './app/reducer.js';
import App from './app/components/App.js';
import './app/tests.js';

// Configurable values
const gameLength = 15000, // in ms
      moleOutLength = 2000,
      numRounds = 5,
      molesPerRound = 3,
      roundLength = gameLength/numRounds;

// Dev-tools integration, remove for deployment
const devToolIntegration = window.devToolsExtension ? window.devToolsExtension() : undefined;

const store = createStore(reducer, devToolIntegration);
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
    /> 
    , document.getElementById('app'));
}

function startGame() {

  store.dispatch({ type: 'GAMESTATE_START' });
  
  const roundInterval = triggerRounds();

  // set a timeout to dispatch the 'game end' message
  setTimeout(() => {
    clearInterval(roundInterval);
    store.dispatch({ type: 'GAMESTATE_END' })
  }, gameLength);
}

function triggerRounds() {
  const moles = store.getState().moles,
        indexList = _.range(moles.length);

  // get a list of n random, unique indexes and trigger those moles
  return setInterval(() => 
    _.sampleSize(indexList, molesPerRound).map(triggerMole),
    roundLength
  );
}

function triggerMole(i) {

  store.dispatch({ type: 'MOLE_COMES_OUT', index: i });
  
  setTimeout(() => 
    store.dispatch({ type: 'MOLE_GOES_IN', index: i }), 
  moleOutLength);
}

function onMoleClick(index) {
  return function () {
    if (store.getState().moles[index].isOut) {
      store.dispatch({ type: 'MOLE_HIT', index: index });
    }
  }
}