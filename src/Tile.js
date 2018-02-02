import React from 'react';

const Tile = (props) => {
  const tileClass = "tile button btn "+ "image_"+ props.status;
    return (
      <div className={tileClass} onClick={(e) => props.tileClick(e.target, props.position, props.status)}>{props.status}</div>
    )
}

export default Tile;
