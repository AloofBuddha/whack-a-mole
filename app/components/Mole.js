import React from 'react';

export default class Mole extends React.Component {
  render() {
    const { moleState, onMoleClick } = this.props;

    return (
      <div className={getHoleClass(moleState)} onClick={onMoleClick}>
        <img className={getMoleClass(moleState)} src="assets/mole.png"/>
      </div>
    );
  }
}

function getMoleClass(moleState) {
  const moleClass = 
    moleState === 'out' ? 'pop-out' : ''; 
  return `mole ${moleClass}`;
}

function getHoleClass(moleState) {
  const holeClass = 
    moleState === 'hit' ? 'mole-hit' : ''; 
  return `hole ${holeClass}`;
}