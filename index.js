import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import reducer from './app/reducer.js';
import App from './app/components/App.js';
import './app/tests.js';

// CONFIGURABLE
const gameLength = 30000, // 30000 milliseconds = 30s
      roundLength = 1000, // the time in between new moles popping up
      molesPerRoundLow = 1, // low/high of how many moles per round
      molesPerRoundHigh = 3,
      moleOutLengthLow = 1500, // low/high of how long a mole stays out
      moleOutLengthHigh = 2500;

// REDUX SETUP
const initialState = Immutable({
  // unstarted | new | gameover 
  gameState: 'unstarted',
  moles: _.times(9, i => ({
    index: i,
    // out, in, hit
    moleState: 'in'
  })),
  gameLength
});

const store = createStore(reducer, initialState);
// render on every store change
store.subscribe(render);
// render once, to begin
render();

// RENDER FUNCTION
function render() {
  ReactDOM.render(
    <App 
      state={store.getState()}
      onStart={startGame}
      onMoleClick={onMoleClick}
    />, 
    document.getElementById('app'));
}

// GAME LOGIC
function startGame() {
  const gameState = store.getState().gameState;
  const audio = new Audio('assets/whack.mp3');

  if (gameState !== 'started') {
    audio.play();
    store.dispatch({ type: 'GAMESTATE_START' });

    // dispatch a 'tick' every second
    const clockInterval = setInterval(() => {
      store.dispatch({ type: 'TICK' })
    }, 1000);

    // trigger a new round every roundLength
    const roundsInterval = setInterval(triggerRound, 1000);

    // set a timeout to dispatch the 'game end' message
    setTimeout(() => {
      clearInterval(roundsInterval);
      clearInterval(clockInterval);
      store.dispatch({ type: 'GAMESTATE_END' });
    }, gameLength);
  }
}

function triggerRound() {
  const moles = store.getState().moles,
        molesIn = _.filter(moles, mole => mole.moleState === 'in'),
        indexList = _.map(molesIn, mole => mole.index),
        molesThisRound = _.random(molesPerRoundLow, molesPerRoundHigh);

  _.sampleSize(indexList, molesThisRound).map(triggerMole);

  function triggerMole(index) {
    const moleOutLength = _.random(moleOutLengthLow, moleOutLengthHigh);

    store.dispatch({ type: 'MOLE_COMES_OUT', index });
    
    // set a timeout to dispatch the 'mole goes in' message
    setTimeout(() => {
      store.dispatch({ type: 'MOLE_GOES_IN', index }) 
    }, moleOutLength);
  }
}

function onMoleClick(index) {
  const audio = new Audio('assets/whack.mp3');

  return function (event) {
    // only send the message if clicked mole is currently out
    if (store.getState().moles[index].moleState === 'out') {
      audio.play();
      store.dispatch({ type: 'MOLE_HIT', index });
    }
  }
}