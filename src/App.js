import React, { Component } from 'react';
import KeyHandler, {KEYUP} from 'react-key-handler'

import './App.css';

import Box from './Box'


class App extends Component {

  constructor() {
    super()

    this.handleKeyEvent = this.handleKeyEvent.bind(this)
    this.handleClickEvent = this.handleClickEvent.bind(this)
    this.getEmptySlot = this.getEmptySlot.bind(this)

    this.state = {
      keyPressed: null,
      board: this.createNewBoard(),
      emptySlot: 0
    }
  }

  componentDidMount() {
    this.setState({
      emptySlot: this.getEmptySlot()
    })
  }

  getEmptySlot() {
    return this.state.board.indexOf("")
  }

  createNewBoard() { 
    return this.shuffle(["1", "2", "3", "4", "5", "6", "7", "8", ""])
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a
  }

  handleClickEvent (e, i) {
    let array = this.state.board
    let emptySlot = this.state.emptySlot
    if (i+1 === emptySlot || i+3 === emptySlot || i-1 === emptySlot || i-3 === emptySlot ) {
      let aux = array[i]
      array[i] = ""  
      array[emptySlot] = aux
      this.setState({
          board: array,
          emptySlot: i
      })
    }
  }

  handleKeyEvent (e) {
    let array = this.state.board
    let emptySlot = this.state.emptySlot
    switch (e.key) {
      case "ArrowDown":
        if(!(emptySlot === 0 || emptySlot === 1 || emptySlot === 2)) {
          let aux = array[emptySlot - 3]
          array[emptySlot - 3] = ""  
          array[emptySlot] = aux
          this.setState({
              board: array,
              emptySlot: emptySlot - 3
            })
          }
        break;

      case "ArrowUp": 
        if(!(emptySlot === 6 || emptySlot === 7 || emptySlot === 8)) {
          let aux = array[emptySlot + 3]
          array[emptySlot + 3] = ""  
          array[emptySlot] = aux
          this.setState({
              board: array,
              emptySlot: emptySlot + 3
            })
          }
          break;

      case "ArrowRight": 
        if(!(emptySlot === 0 || emptySlot === 3 || emptySlot === 6)) {
          let aux = array[emptySlot - 1]
          array[emptySlot - 1] = ""  
          array[emptySlot] = aux
          this.setState({
              board: array,
              emptySlot: emptySlot - 1
            })
          }
          break;

      case "ArrowLeft":
          if(!(emptySlot === 2 || emptySlot === 5 || emptySlot === 8)) {
          let aux = array[emptySlot + 1]
          array[emptySlot + 1] = ""  
          array[emptySlot] = aux
          this.setState({
              board: array,
              emptySlot: emptySlot + 1
            })
          }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App" >
        <KeyHandler keyEventName={KEYUP} keyValue="ArrowDown" onKeyHandle={this.handleKeyEvent} />
        <KeyHandler keyEventName={KEYUP} keyValue="ArrowUp" onKeyHandle={this.handleKeyEvent} />
        <KeyHandler keyEventName={KEYUP} keyValue="ArrowLeft" onKeyHandle={this.handleKeyEvent} />
        <KeyHandler keyEventName={KEYUP} keyValue="ArrowRight" onKeyHandle={this.handleKeyEvent} />
        <div className="board">
          {this.state.board.map((box, i) => (<Box number={box} key={i} handleOnClick={(e) => this.handleClickEvent(e, i)}/>))}
        </div>        
      </div>
    );
  }
}

export default App;
