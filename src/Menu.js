import React from 'react';
const Menu = (props) => {
    // clickHandler = (e) => {
    //     props.restart();
    // }
    return(
          <div id="menu">
                <h4 id="subtitle">Have you won the game? {props.status}</h4>
                <button className={props.winClass} onClick={() => props.restart()}>Reset Grid</button>
                <br/>
                <br/>
          </div>
    )
}

export default Menu;
