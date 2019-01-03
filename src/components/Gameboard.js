import React from 'react';
import Mole from './Mole.js';
import './Gameboard.css';

export default class Gameboard extends React.Component {

  render () {
    const { moles, onMoleClick } = this.props;

    return (
      <div className="Gameboard">
        {moles.map((mole) => 
          <Mole key={mole.index} 
                moleState={mole.moleState}
                onMoleClick={onMoleClick(mole.index)}/>
        )}
      </div>
    );
  }
}