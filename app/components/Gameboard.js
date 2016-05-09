import React from 'react';
import Mole from './Mole.js';

export default class Gameboard extends React.Component {

  render () {
    const { moles, onMoleClick } = this.props;
    const style = {
      display: 'flex',
      flexFlow: "row wrap",
      maxWidth: '450px'
    };

    return (
      <div style={style}>
        {moles.map((mole) => 
          <Mole key={mole.index} 
                isOut={mole.isOut}
                onMoleClick={onMoleClick(mole.index)}/>
        )}
      </div>
    );
  }
}