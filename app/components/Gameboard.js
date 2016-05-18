import React from 'react';
import Mole from './Mole.js';

export default class Gameboard extends React.Component {

  render () {
    const { moles, onMoleClick, gameState } = this.props;

    return (
      <div className="gameboard with-mallet">
        {moles.map((mole) => 
          <Mole key={mole.index} 
                moleState={mole.moleState}
                onMoleClick={onMoleClick(mole.index)}/>
        )}
      </div>
    );
  }
}