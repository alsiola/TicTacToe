import React, { Component } from 'react';
import GameBoard from './GameBoard/GameBoard';
import MoveHistory from './MoveHistory/MoveHistory';
import GameHistory from './GameHistory/GameHistory';
import LoginForm from './LoginForm/LoginForm';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

function Row(props) {
  let classes = "row";
  classes += props.classes ? props.classes : " around-xs";
  return (
    <div className={classes}>{props.children}</div>
  )
}

function Col(props) {
  let classes="col-xs-";
  classes += props.xs ? props.xs : "4";
  let style = {"textAlign": props.align || "center"};
  return (
    <div style={style}  className={classes}>{props.children}</div>
  )
}

class TicTacToeApp extends Component {
  render() {
    let replayStatus = '';
    if (this.props.isReplayedGame) {
      replayStatus = "Current replaying Game " + this.props.currentReplay;
    }
    return (
      <Row>
        <Col xs={12}>
        
          <Row>
            <Col xs={5}>
              <Paper style={{padding: "10px"}} zDepth={4}>
                <GameBoard 
                    squares={this.props.squares} 
                    winningLine={this.props.winningLine} 
                    handleClick={i => this.props.onPlayClick(i, this.getNextMove(), this.props.squares, this.props.gameOptions.aiPlayer, this.getNextMove(this.props.currentStep + 1))} 
                />
              </Paper>
            </Col>
            <Col xs={5}>
              <Paper style={{padding: "10px"}} zDepth={4}>
                <List>
                  <ListItem>
                  <span>Next move: {this.props.currentStep % 2 === 0 ? 'X' : 'O'}</span>
                  </ListItem>
                  {replayStatus.length > 0 && (
                    <ListItem>
                    {replayStatus}
                    </ListItem>
                  )
                  }
                  {this.props.saveGameStatus.length > 0 &&
                    <ListItem>
                      {this.props.saveGameStatus}
                    </ListItem>
                  }                  
                  <ListItem>
                    <RaisedButton primary={true} onClick={() => this.props.reset(this.props.history, !this.props.isReplayedGame && this.props.loginStatus.isLoggedIn)} label="Reset" />                  
                  </ListItem>
                  <ListItem>
                  <Checkbox 
                      checked={this.props.gameOptions.aiPlayer} 
                      onCheck={(e) => this.props.toggleAI(e.target.checked) } 
                      labelPosition="left" 
                      labelStyle={{width: "initial"}}
                      label="AI Player?" />
                  </ListItem>
                  </List>                     
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col xs="5">
              <MoveHistory 
                order={this.props.gameOptions.historyOrderAsc} 
                toggleOrder={() => this.props.toggleHxOrder()} 
                currentStep={this.props.currentStep} 
                history={this.props.history} 
                jumpTo={i => this.props.loadHistoryEntry(i, this.props.history[i].squares)} 
              />
            </Col>
            <Col xs="5">
              <GameHistory loginStatus={this.props.loginStatus} loadGame={(gameNum, autoPlay) => this.loadGame(gameNum, autoPlay)} gameHistory={this.props.gameHistory}>
                <LoginForm loginStatus={this.props.loginStatus} login={(u, p) => this.props.login(u, p)} />
              </GameHistory>
            </Col>
          </Row>
        </Col>
      </Row>
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

export default TicTacToeApp;
