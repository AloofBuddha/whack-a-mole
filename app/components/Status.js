import React from 'react';
import _ from 'lodash';

export default class Status extends React.Component {
  render() {
    const {gameState, score, scoreToWin} = this.props;

    return (
      <div>
        <div className={getScoreClass(gameState)}>
          <span className={score >= scoreToWin ? 'green' : 'red'}>{score}</span>/{scoreToWin}
        </div>
        <div className={getStatusClass(gameState)}>
          {
            gameState === 'win' ? 'You WON!' :
            gameState === 'lose' ? 'You LOST!' : <br/>
          }
        </div>
      </div>
    );
  }
}

function getScoreClass(gameState) {
  const visibility = gameState === 'unstarted' ? 'hidden' : 'visible';
  return `score ${visibility}`;
}

function getStatusClass(gameState) {
  const visibilityAndColor = 
    gameState === 'win' ? 'visible green' : 
    gameState === 'lose' ? 'visible red' : 'hidden';
  
  return `status ${visibilityAndColor}`;
}