import expect from 'expect';
import Immutable from 'seamless-immutable';
import reducer from './reducer.js';

//runTests();

function runTests() {
  newGameTest();
  endGameTest();
  molePopsOutTest();
  moleGoesAwayTest();
  
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
      id: i,
      isOut: false
    }))
  });

  let expected = Immutable({
    gameState: 'started',
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
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
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  let expected = Immutable({
    gameState: 'lose', 
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  let action = { 
    type: 'GAMESTATE_END', 
    scoreToWin: 10 
  };

  // lose state
  testAction(initial, expected, action);


  initial = Immutable({
    gameState: 'started',
    score: 10,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  expected = Immutable({
    gameState: 'win', 
    score: 10,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  // win state
  testAction(initial, expected, action);
}

function molePopsOutTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started', 
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: i === 8
    }))
  });

  let action = { 
    type: 'MOLE_COMES_OUT', 
    index: 8
  };

  // lose state
  testAction(initial, expected, action);
}

function moleGoesAwayTest() {
  let initial = Immutable({
    gameState: 'started',
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: i === 8
    }))
  });

  // we only expect index 8 to be out
  let expected = Immutable({
    gameState: 'started', 
    score: 0,
    moles: _.times(9, i => ({
      id: i,
      isOut: false
    }))
  });

  let action = { 
    type: 'MOLE_GOES_IN', 
    index: 8
  };

  // lose state
  testAction(initial, expected, action);
}