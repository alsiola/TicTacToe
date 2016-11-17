import React from 'react';
import Paper from '../../Layout/Paper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import './GameOptions.css';

export default function(props) {
    let replayStatus = '';
    if (props.isReplayedGame) {
      replayStatus = "Current replaying Game " + props.currentReplay;
    }
    let moveStatus = '';
    if (props.winningLetter) {
        moveStatus = props.winningLetter + " is the winner!"
    } else {
        moveStatus = "Next move: " + (props.currentStep % 2 === 0 ? 'X' : 'O');
    }
    return (
        <Paper zDepth={4}>
            <Subheader>Game Status</Subheader>
                <div className={props.winningLetter ? "winning-status" : ""}><span>{moveStatus}</span></div>
                {replayStatus.length > 0 && (
                <div>
                {replayStatus}
                </div>
                )
                }
                {props.saveGameStatus.length > 0 &&
                <div>
                    {props.saveGameStatus}
                </div>
                }                  
                <div>
                <RaisedButton primary={true} onClick={() => props.reset(props.history, !props.isReplayedGame && props.loginStatus.isLoggedIn)} label="Reset" />                  
                </div>
                <div>
                    <Checkbox 
                        defaultChecked={props.gameOptions.aiPlayer} 
                        onCheck={(e) => props.toggleAI(e.target.checked) } 
                        labelPosition="left" 
                        labelStyle={{width: "initial"}}
                        label="AI Player?"
                    />
                </div>              
        </Paper>
    );
}
