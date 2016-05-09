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
        <h1>Whack-A-Mole</h1>
        <Status 
          gameState={gameState}
          score={score}
          scoreToWin={scoreToWin}
        />
        <Gameboard 
          moles={moles} 
          onMoleClick={onMoleClick}
        />
        <button 
          onClick={onStart} 
          className={getButtonClass(gameState)}>
            { gameState === 'unstarted' ? 'Start Game' : 'Play Again' }
        </button> 
      </div>
    );
  }
}

function getButtonClass(gameState) {
  const visibility = gameState === 'started' ? 'hidden' : 'visible';
  return `start-button ${visibility}`;
}