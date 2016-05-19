import React from 'react';
import _ from 'lodash';

export default class Status extends React.Component {
  render() {
    const { gameState, onStart, score, highScore, time } = this.props;

    return (
      <div className="status-menu" onClick={onStart}>
        {
          gameState === 'unstarted' ? 
            renderUnstarted()
          : gameState === 'started' ? 
            renderStarted(score, time)
          : gameState === 'gameover' ? 
            renderGameOver(score, highScore)
          : null
        }
      </div>
    );
  }
}

function renderUnstarted() {
  return (
    <div>
      <h1>Whack-A-Mole</h1> 
      <h3>Whack here to start</h3>
    </div>
  );
}

function renderStarted(score, time) {
  const date = new Date(time),
        format = time => time < 10 ? '0' + time : time,
        minutes = format(date.getMinutes()),
        seconds = format(date.getSeconds());

  return (
    <div>
      <h2>Score: {score}</h2>
      <h3>Timer: {minutes}:{seconds}</h3>
    </div>  
  );
}

function renderGameOver(score, highScore) {
  return (
    <div>
      <h1>Game Over</h1> 
      <h2>You scored {score} point(s)!</h2>
      {
        score > highScore ?
        <h2>That's a new High Score!</h2>
        : <h2>High Score: {highScore} points</h2>
      }
      <h3>Whack here to play again</h3>
    </div>
  );
}
