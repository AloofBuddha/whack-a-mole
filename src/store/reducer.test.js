import expect from 'expect';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import reducer from './reducer.js';

localStorage.clear();

it('starts the game', () => {
    const initialState = Immutable({
      gameState: 'unstarted',
      score: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in'})),
      gameLength: 30000
    });
  
    const action = { type: 'GAMESTATE_START' };
  
    const expectedState = Immutable({
      gameState: 'started',
      score: 0,
      time: 30000,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in'})),
      gameLength: 30000
    });
  
    expect(reducer(initialState, action)).toEqual(expectedState);
  
  });
  
  it('ends the game', () => {
    const initial = Immutable({
      gameState: 'started',
      score: 0,
      time: 0,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'out'})),
      gameLength: 30000
    });
  
    const action = { type: 'GAMESTATE_END' };
  
    const expected = Immutable({
      gameState: 'gameover',
      score: 0,
      time: 0,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in'})),
      gameLength: 30000
    });
  
    expect(reducer(initial, action)).toEqual(expected);
  });
  
  it('pops out a mole', () => {
    const initial = Immutable({
      gameState: 'started',
      score: 0,
      time: 30000,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in'})),
      gameLength: 30000
    });
  
    const action = { type: 'MOLE_COMES_OUT', index: 8 };
  
    // we only expect index 8 to be out
    const expected = Immutable({
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
  
    expect(reducer(initial, action)).toEqual(expected);
  });
  
  it('pops in a mole', () => {
     // we only expect index 8 to be out
     const initial = Immutable({
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
  
    const action = { type: 'MOLE_GOES_IN', index: 8 };
  
    const expected = Immutable({
      gameState: 'started',
      score: 0,
      time: 30000,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in'})),
      gameLength: 30000
    });
  
    expect(reducer(initial, action)).toEqual(expected);
  });
  
  it('hits a mole', () => {
    const initial = Immutable({
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
  
    const action = { type: 'MOLE_HIT', index: 8 };
  
    // we only expect index 8 to be hit 
    const expected = Immutable({
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
  
    expect(reducer(initial, action)).toEqual(expected);
  });
  
  it('ticks down the timer', () => {
    const initial = Immutable({
      gameState: 'started',
      score: 0,
      time: 30000,
      highScore: 0,
      moles: _.times(9, i => ({ index: i, moleState: 'in' })),
      gameLength: 30000
    });
  
    const action = { type: 'TICK' };
  
    // 1000 ms are subtracted with each tick
    const expected = Immutable({
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
  
    expect(reducer(initial, action)).toEqual(expected);
  });

  
