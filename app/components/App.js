import React from 'react';
import Gameboard from './Gameboard.js';
import Status from './Status.js';

export default class App extends React.Component {
  render() {
    const {state, onStart, onMoleClick} = this.props;
    const {moles, gameState, score, highScore, time} = state;

    return (
      <div>
        <Status 
          onStart={onStart}
          gameState={gameState}
          score={score}
          highScore={highScore}
          time={time}
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