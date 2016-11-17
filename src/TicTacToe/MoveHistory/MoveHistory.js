import React, { Component } from 'react';
import Paper from '../../Layout/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import './MoveHistory.css';

class MoveHistory extends Component {
    render() {
        let history = this.props.history.slice();
        if (!this.props.order) {
            history.reverse();
        }
        return (
            <Paper zDepth={4}>
                <Subheader>Move History</Subheader>
                <div><RaisedButton primary={true} onTouchTap={() => this.props.toggleOrder()} label="Toggle Hx Order" /></div>
                <List>
                    {history.map((val, ind) => {
                        return (
                            <ListItem 
                                key={ind} 
                                className={this.props.currentStep === val.step ? 'current' : 'not-current'}
                                onTouchTap={() => this.props.jumpTo(val.step)} 
                                >
                                Step: {val.step + 1}
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        )
    }
}

export default MoveHistory;