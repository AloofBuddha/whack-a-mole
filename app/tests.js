import expect from 'expect';
import Immutable from 'seamless-immutable';
import reducer from './reducer.js';

runTests();

function runTests() {
  localStorage.clear();

  newGameTest();
  endGameTest();
  molePopsOutTest();
  moleGoesAwayTest();
  moleHitTest();
  tickTest();
  
  console.log('tests passed');
}

function testAction(initialState, expectedState, action) {
  expect(
    reducer(initialState, action)
  ).toEqual(expectedState);
}

function newGameTest() {
  let initial = Immutable({
    gameState: 'unstarted',
    score: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  let expected = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'GAMESTATE_START' 
  };

  testAction(initial, expected, action);
}

function endGameTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    time: 0,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'out'
    })),
    gameLength: 30000
  });

  let expected = Immutable({
    gameState: 'gameover',
    score: 0,
    time: 0,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'GAMESTATE_END'
  };

  testAction(initial, expected, action);
}

function molePopsOutTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: i === 8 ? 'out' : 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'MOLE_COMES_OUT', 
    index: 8
  };

  testAction(initial, expected, action);
}

function moleGoesAwayTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: i === 8 ? 'out' : 'in'
    })),
    gameLength: 30000
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'MOLE_GOES_IN', 
    index: 8
  };

  testAction(initial, expected, action);
}

function moleHitTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: i === 8 ? 'out' : 'in'
    })),
    gameLength: 30000
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started',
    score: 1,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: i === 8 ? 'hit' : 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'MOLE_HIT', 
    index: 8
  };

  testAction(initial, expected, action);
}

function tickTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    time: 30000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started',
    score: 0,
    time: 29000,
    highScore: 0,
    moles: _.times(9, i => ({
      index: i,
      moleState: 'in'
    })),
    gameLength: 30000
  });

  let action = { 
    type: 'TICK'
  };

  testAction(initial, expected, action);
}