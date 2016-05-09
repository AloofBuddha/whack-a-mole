import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  // unstarted | new | win | lose 
  gameState: 'unstarted',
  moles: _.times(9, i => ({
    index: i,
    isOut: false
  }))
});

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'GAMESTATE_START': 
      return state
        .set('gameState', 'started')
        .set('score', 0)
        .set('moles', state.moles.map(mole =>
          mole.set('isOut', false) 
        ));

    case 'GAMESTATE_END': 
      return state
        .update('gameState', () => 
          state.score >= action.scoreToWin ? 'win': 'lose')
        .set('moles', state.moles.map(mole =>
          mole.set('isOut', false) 
        ));

    case 'MOLE_COMES_OUT':
      return state
        .setIn(['moles', action.index, 'isOut'], true);

    case 'MOLE_GOES_IN':
      return state
        .setIn(['moles', action.index, 'isOut'], false);

    case 'MOLE_HIT':
      return state
        .setIn(['moles', action.index, 'isOut'], false)
        .update('score', score => score + 1);

    default:
      return state;
  }
}

// takes a single mole or an array of moles and makes them appear
function moleComesOut(mole) {
  if (_.isArray(mole)) {
    mole.map(moleComesOut)
  }
}



