import React from 'react';

export default class Mole extends React.Component {
  render() {
    const { isOut, onMoleClick } = this.props;
    const style = {
      backgroundColor: isOut ? 'red' : 'white',
      padding: '20px',
      margin: '10px',
      border: 'solid black'
    };

    return (
      <span style={style} onClick={onMoleClick}>
        { isOut ? 'MOLE' : 'no mole'}
      </span>
    );
  }
}