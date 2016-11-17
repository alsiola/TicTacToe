import React, {Component} from 'react';
import TicTacToeContainer from '../TicTacToe/TicTacToeContainer';
import AppBar from 'material-ui/AppBar';
import LoginForm from '../LoginForm/LoginForm';

class LayoutComponent extends Component {
    render() {
        return (
            <div>
                <AppBar title="Let's Play!"                
                 iconElementRight={<LoginForm loginStatus={this.props.loginStatus} login={(u, p) => this.props.login(u, p)} />}
                />
                <TicTacToeContainer />
            </div>
        )
    }
}

export default LayoutComponent;