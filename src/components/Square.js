import React from 'react';

const Square = ({ flag, isMine, numAdjacentMines, status, x, y, handleClick, handleRightClick }) => {

  const fill = isMine ? '👽' : numAdjacentMines ? numAdjacentMines : '';
  const flagFill = flag === 1 ? '🏳' : flag === 2 ? '?' : '';

  const isEmoji = isMine || flag === 1 ? ' is-emoji' : ' is-text';
  
  return (
    <div
      data-x={x}
      data-y={y}
      className={"cell" + (status ? '' : ' hidden') + isEmoji} 
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {fill}<span className={"flag" + isEmoji}>{flagFill}</span>
    </div>
  );
};

export default Square;