import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  render() {
      return <button className={this.props.class} onClick={this.props.handleClick}>{this.props.letter}</button>
  }
}

export default Square;