import React from 'react';
import molePNG from '../assets/mole.png';
import './Mole.css';

export default class Mole extends React.Component {
  render() {
    const { moleState, onMoleClick } = this.props;

    return (
      <div className={getHoleClass(moleState)} onClick={onMoleClick}>
        <img 
          className={getMoleClass(moleState)} 
          src={molePNG}
          alt="mole"
        />
      </div>
    );
  }
}

function getMoleClass(moleState) {
  return `Mole ${moleState === 'out' ? 'Pop-out' : ''}`;
}

function getHoleClass(moleState) {
  return `Hole ${moleState === 'hit' ? 'Mole-hit' : ''}`;
}