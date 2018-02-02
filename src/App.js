import React, {Component} from 'react';
import './App.css';
import Tile from './Tile';
import Menu  from './Menu';

class App extends Component {
    constructor(){
      super();
      this.state = {
        // initial state of game board
      tiles: [
        1,2,3,4,5,
        6,7,8,9,10,
        11,12,13,14,15,
        16,17,18,19,20,
        21,22,23,24,''
      ],
      win: false,
      }
    }

    componentDidMount(){
      this.setState({
        tiles: this.shuffle([
                1,2,3,4,5,
                6,7,8,9,10,
                11,12,13,14,15,
                16,17,18,19,20,
                21,22,23,24,''
            ])
      });

      for(let i = 0 ; i <= 24 ; i++){
        setTimeout(() => {
          this.setState({
            tiles:  this.swapEmptyTile(this.state.tiles)
          })
        },i * 500);
      }
    }
      // switches first two tiles
     switchTiles = (array) => {
       var i = 0;

       // find the first two tiles in a row
       while (!array[i] || !array[i+1]) i++;
       // store tile value
       var tile = array[i];
       // switch values
       array[i] = array[i+1];
       array[i+1] = tile;
       return array;
    }

    getRandomNumber= (max,min) =>{
      return Math.random() * (max - min) + min;
    }

    // swapping empty blocks
    swapEmptyTile = (array) => {
      // get random number for swapping empty tile
      var randomNum = Math.floor(this.getRandomNumber(array.length,0));
      for(let j = 0 ; j < array.length; j++){
        if(array[j] === ''){
          // store tile value
          var tile = array[j];
          // switch values
          array[j] = array[randomNum];
          array[randomNum] = tile;
        }
      }
      // check for even number of inversions
      if (this.countInversions(array) % 2 !== 0) {
         // switch two tiles if odd
         array = this.switchTiles(array);
      }

      return array;
    }

    // counts inversions
    countInversions = (array) => {
       // make array of inversions
       var invArray = array.map(function(num, i) {
           var inversions = 0;
           for (var j = i + 1; j < array.length; j++) {
               if (array[j] && array[j] < num) {
                   inversions += 1;
               }
           }
           return inversions;
       });
         // return sum of inversions array
         return invArray.reduce(function(a, b) {
             return a + b;
         });

    }

    // fischer-yates shuffle algorithm
    fischerYates = (array) => {
       var counter = array.length, temp, index;

       // While there are elements in the array
       while (counter > 0) {
           // Pick a random index
           index = Math.floor(Math.random() * counter);
           // Decrease counter by 1
           counter--;
           // And swap the last element with it
           temp = array[counter];
           array[counter] = array[index];
           array[index] = temp;
       }

       return array;
    }

    shuffle = (array) => {
      if(array.length > 0){
        // Fischer-Yates shuffle
        array = this.fischerYates(array);

        // check for even number of inversions
        if (this.countInversions(array) % 2 !== 0) {
           // switch two tiles if odd
           array = this.switchTiles(array);
        }

      }
        return array;
    }

    checkBoard =  () => {
        var tiles = this.state.tiles;

        for (var i = 0; i < tiles.length-1; i++) {
            if (tiles[i] !== i+1) return false;
        }

        return true;
    }

    animateTiles = (i, move, tileEl) => {
        var directions = ['up','right','down','left'];
        var moveToEl = document.querySelector('.tile:nth-child(' + (move + 1) + ')');
        var direction = directions[i];
        tileEl.classList.add('move-' + direction);
        // this is all a little hackish.
        // css/js are used together to create the illusion of moving blocks
        setTimeout(function() {
            moveToEl.classList.add('highlight');
            tileEl.classList.remove('move-' + direction);
            // time horribly linked with css transition
            setTimeout(function() {
                moveToEl.classList.remove('highlight');
            }, 400);
        }, 200);
    }

    // called after tile is fully moved
    // sets new state
     afterAnimate = (tiles,position,move,moves,status) => {
        tiles[position] = '';
        tiles[move] = status;
        this.setState({
            tiles: tiles,
            moves: moves,
            win: this.checkBoard()
        });
    }

    tileClick = (tileEl, position, status) => {
         var tiles = this.state.tiles;
         // Possible moves
         // [up,right,down,left]
         // 9 = out of bounds
         var moves = [
             [null,1,5,null],[null,2,6,0],[null,3,7,1],[null,4,8,2],[null,null,9,3],
             [0,6,10,null],[1,7,11,5],[2,8,12,6],[3,9,13,7],[4,null,14,8],
             [5,11,15,null],[6,12,16,10],[7,13,17,11],[8,14,18,12],[9,null,19,13],
             [10,16,20,null],[11,17,21,15],[12,18,22,16],[13,19,23,17],[14,null,24,18],
             [15,21,null,null],[16,22,null,20],[17,23,null,21],[18,24,null,22],[19,null,null,23]
         ];

         // return if they've already won
         if (this.state.win) return;

         // check possible moves
         for (var i = 0; i < moves[position].length; i++) {
             var move = moves[position][i];
             // if an adjacent tile is empty
             if (typeof move === 'number' && !tiles[move]) {
                 this.animateTiles(i, move, tileEl);
                 setTimeout(this.afterAnimate(tiles,position,move,moves,status), 200);
                 break;
             }
         }
     }

     restartGame =  () => {
       this.setState({
         tiles: this.shuffle([
             1,2,3,4,5,
             6,7,8,9,10,
             11,12,13,14,15,
             16,17,18,19,20,
             21,22,23,24,'',
         ]),
         win: false
       });
      }

    render(){
      return (
        <div>
           <div id="game-board">
               {this.state.tiles.map(function(tile, position) {
                   var t = <Tile key={position} position={position} status={tile} tileClick={this.tileClick} />;
                   return t;
               }, this)}
           </div>
           <Menu winClass={this.state.win ? 'button-menu win btn' : 'button btn'} status={this.state.win ? 'Yes' : 'No'} restart={this.restartGame} />
         </div>
      )
    }
}

export default App;
