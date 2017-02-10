import React from 'react';
import './Box.css'


const Box = ({number, handleOnClick}) => {
    return (
        <div className="box" onClick={handleOnClick}>
            {number}
        </div>
    );
};

export default Box;