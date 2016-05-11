import React from 'react';
import _ from 'lodash';

export default class Status extends React.Component {
  render() {
    const { gameState, onStart, score, total } = this.props;

    return (
      <div className="status-menu">
        {
          gameState === 'unstarted' ? 
            renderUnstarted(onStart)
          : gameState === 'started' ? 
            renderStarted(score, total)
          : renderGameOver(score, onStart)
        }
      </div>
    );
  }
}

function renderUnstarted(onStart) {
  return (
    <div onClick={onStart}>
      <h1>Whack-A-Mole</h1> 
      <h3>Whack here here to start</h3>
    </div>
  );
}

function renderStarted(score, total) {
  return (
    <h2>Score: {score}</h2>
      // could add timer here
  );
}

function renderGameOver(score, onStart) {
  return (
    <div onClick={onStart}>
      <h1>Game Over</h1> 
      <h2>You scored {score} point(s)!</h2>
      <h3>Whack here to play again</h3>
    </div>
  );
}
