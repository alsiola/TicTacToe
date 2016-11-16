import React, { Component } from 'react';
import Square from './Square/Square';

class Row extends Component {
  render() {
      const rowSquares = [0,1,2].map(j => {
          return this.renderSquare(this.props.rowNum+j);
      });
      return (
          <div>{rowSquares}</div>
      )
  }
  
  renderSquare(i) {
    const classes = (this.props.winningLine && this.props.winningLine.includes(i)) ? 'square winner' : 'square';
    return <Square key={i} handleClick={() => this.props.handleClick(i)} class={classes} letter={this.props.squares[i]} />
  }
}

export default Row;