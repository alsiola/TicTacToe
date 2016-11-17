import React, { Component } from 'react';
import Row from './Row/Row';
import Paper from 'material-ui/Paper';
import './GameBoard.css';

class GameBoard extends Component {
  render() {
    return (      
      <Paper style={{padding: "10px"}} zDepth={4}>
        <div className="board">
          {[0,1,2].map(i => {          
            return (
              <Row key={i} rowNum={3*i} winningLine={this.props.winningLine} squares={this.props.squares} handleClick={this.props.handleClick} className="board-row" />
            );
          })}
        </div>
      </Paper>
    );
  }
}

export default GameBoard;