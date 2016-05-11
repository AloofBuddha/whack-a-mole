import React from 'react';
import Mole from './Mole.js';

export default class Gameboard extends React.Component {

  render () {
    const { moles, onMoleClick, gameState } = this.props;

    return (
      <div className="gameboard with-mallet">
        {moles.map((mole) => 
          <Mole key={mole.index} 
                isOut={mole.isOut}
                onMoleClick={onMoleClick(mole.index)}/>
        )}
      </div>
    );
  }
}
// {withMallet(gameState)}
function withMallet(gameState) {
  return gameState === 'started' ? 'with-mallet' : '';
}