import React from 'react';
import _ from 'lodash';
import Gameboard from './Gameboard.js';
import Status from './Status.js';

export default class App extends React.Component {
  render() {
    const {state, onStart, onMoleClick} = this.props;
    const {moles, gameState, score, scoreToWin} = state;

    return (
      <div>
        <Status 
          onStart={onStart}
          gameState={gameState}
          score={score}
        />
        <Gameboard 
          moles={moles} 
          onMoleClick={onMoleClick}
          gameState={gameState}
        />
      </div>
    );
  }
}