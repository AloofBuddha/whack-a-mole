import React from 'react';
import Gameboard from './components/Gameboard.js';
import Status from './components/Status.js';
import './App.css';

export default class App extends React.Component {
  render() {
    const {state, onStart, onMoleClick} = this.props;
    const {moles, gameState, score, highScore, time} = state;

    return (
      <div className="App">
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