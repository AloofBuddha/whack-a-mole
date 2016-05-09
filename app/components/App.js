import React from 'react';
import Gameboard from './Gameboard.js';

export default class App extends React.Component {
  render() {
    const {state, onStart, onMoleClick} = this.props;

    return (
      <div>
        <h1>Whack-A-Mole</h1>
        { state.gameState !== 'unstarted' ?
          <h2>Score: {state.score}</h2>
          : null
        }
        { state.gameState === 'win' ?
            <h2>YOU WIN</h2>
          : state.gameState === 'lose' ?
            <h2>YOU LOSE</h2>
          : null
        }
        <Gameboard moles={state.moles} onMoleClick={onMoleClick}/>
        { state.gameState === 'unstarted' ?
            <button onClick={onStart}>Start Game</button> 
          : state.gameState !== 'started' ?
            <button onClick={onStart}>Play Again</button>  
          : null
        }
      </div>
    );
  }
}