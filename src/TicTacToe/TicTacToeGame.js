import React, { Component } from 'react';
import GameBoard from './GameBoard/GameBoard';
import MoveHistory from './MoveHistory/MoveHistory';
import GameHistory from './GameHistory/GameHistory';
import GameOptions from './GameOptions/GameOptions';
import {Grid, Row, Col} from '../Layout/FlexBoxGrid';

// function Row(props) {
//   let classes = "row";
//   classes += props.classes ? props.classes : " around-xs";
//   return (
//     <div className={classes}>{props.children}</div>
//   )
// }

// function Col(props) {
//   let classes="col-xs-";
//   classes += props.xs ? props.xs : "4";
//   let style = {"textAlign": props.align || "center"};
//   return (
//     <div style={style}  className={classes}>{props.children}</div>
//   )
// }

class TicTacToeGame extends Component {
  render() {
    
    return (
    <Grid>
      <Row>
        <Col xs={12}>        
          <Row>
            <Col xs={12} sm={12} md={5} mdOffset={1}>
                <GameBoard 
                    squares={this.props.squares} 
                    winningLine={this.props.winningLine} 
                    handleClick={i => this.props.onPlayClick(i, this.getNextMove(), this.props.squares, this.props.gameOptions.aiPlayer, this.getNextMove(this.props.currentStep + 1))} 
                />
            </Col>
            <Col xs={12} sm={12} md={5}>
                <GameOptions {...this.props} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={5} mdOffset={1}>
              <MoveHistory 
                order={this.props.gameOptions.historyOrderAsc} 
                toggleOrder={() => this.props.toggleHxOrder()} 
                currentStep={this.props.currentStep} 
                history={this.props.history} 
                jumpTo={i => this.props.loadHistoryEntry(i, this.props.history[i].squares)} 
              />
            </Col>
            <Col xs={12} sm={6} md={5}>
              <GameHistory 
                loginStatus={this.props.loginStatus} 
                loadGame={(gameNum, autoPlay) => this.loadGame(gameNum, autoPlay)} 
                gameHistory={this.props.gameHistory}>
              </GameHistory>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
    );
  }

  autoplay() {
    this.autoplayer = setInterval(() => {
      if (this.props.currentStep < this.props.history.length - 1) {
        const step = this.props.currentStep + 1;
        this.props.loadHistoryEntry(step, this.props.history[step].squares);
      } else {
        clearInterval(this.autoplayer);
      }
    }, 1000);
  }

  loadGame(gameNumber, startAutoPlay) {
    const game = this.props.gameHistory.filter(item => item.gameNumber === gameNumber)[0];

    this.props.loadGame(game);

    if (startAutoPlay) {
      this.autoplay();
    }
  }

  getNextMove(step = this.props.currentStep) {
    return step % 2 === 0 ? 'X' : 'O';
  }  
}

export default TicTacToeGame;
