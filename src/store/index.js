import { createStore } from 'redux';
import _ from 'lodash';
import reducer from './reducer.js';

// CONFIGURABLE
const gameLength = 30000, // 30000 milliseconds = 30s
      roundLength = 1000, // the time in between new moles popping up
      molesPerRoundLow = 1, // low/high of how many moles per round
      molesPerRoundHigh = 3,
      moleOutLengthLow = 1500, // low/high of how long a mole stays out
      moleOutLengthHigh = 2500;
    
const store = createStore(reducer);

// GAME LOGIC
function startGame() {
  const gameState = store.getState().gameState;

  if (gameState !== 'started') {
    const audio = new Audio(process.env.PUBLIC_URL + '/whack.mp3');
    audio.play();
    store.dispatch({ type: 'GAMESTATE_START' });

    // dispatch a 'tick' every second
    const clockInterval = setInterval(() => {
      store.dispatch({ type: 'TICK' })
    }, 1000);

    // trigger a new round every roundLength
    const roundsInterval = setInterval(triggerRound, roundLength);

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

  _.sampleSize(indexList, molesThisRound).forEach(triggerMole);
}

function triggerMole(index) {
  const moleOutLength = _.random(moleOutLengthLow, moleOutLengthHigh);

  store.dispatch({ type: 'MOLE_COMES_OUT', index });
  
  // set a timeout to dispatch the 'mole goes in' message
  setTimeout(() => {
    store.dispatch({ type: 'MOLE_GOES_IN', index }) 
  }, moleOutLength);
}

function onMoleClick(index) {
  return function (event) {
    // only send the message if clicked mole is currently out
    if (store.getState().moles[index].moleState === 'out') {
      const audio = new Audio(process.env.PUBLIC_URL + '/whack.mp3');
      audio.play();
      store.dispatch({ type: 'MOLE_HIT', index });
    }
  }
}

export default store;
export { startGame, onMoleClick };



