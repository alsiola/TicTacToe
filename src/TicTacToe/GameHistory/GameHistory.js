import React, { Component } from 'react';
import Paper from '../../Layout/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import AVPlay from 'material-ui/svg-icons/av/play-circle-outline';

class MoveHistory extends Component {
    render() {        
        return (
            <Paper zDepth={4}>
                <Subheader>Game History</Subheader>
                {this.props.children}
                <List>
                    {this.props.gameHistory.map((item, ind) => {
                        return (
                            <ListItem 
                            key={ind}
                            primaryText={item.gameNumber}
                            leftIcon={
                                <ActionLaunch  onClick={() => this.props.loadGame(item.gameNumber, false)} />
                            }
                            rightIcon={
                                <AVPlay onClick={() => this.props.loadGame(item.gameNumber, true)} />
                            }
                            />
                        )
                    })}
                </List>
            </Paper>
        )
    }
}
    
export default MoveHistory;