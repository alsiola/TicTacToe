import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

class LoginForm extends Component {
    constructor() {
        super();        
        this.state = {
            open: false,
            loginUser: '',
            password: ''
        }
    }

    render() {
        const actions = [
            <RaisedButton
                label="Cancel"
                onTouchTap={() => this.handleClose()}
            />,
            <RaisedButton
                label="Login"
                primary={true}
                onTouchTap={() => this.props.login(this.state.loginUser, this.state.password)}
            />,
            ];
        const form = (
            <div>
            <Dialog
                title="Login"
                actions={actions}
                modal={true}
                open={this.state.open}
                onRequestClose={() => this.handleClose()}
                >       
            <TextField
                id="login-email"
                type="text"
                floatingLabelText="Email"
                onChange={(e,v) => this.onLoginChange(e,v)}
                disabled={this.props.loginStatus.inProgress}
                value={this.state.loginUser}
            />
            <TextField
                id="login-password"
                type="password"
                floatingLabelText="Password"
                onChange={(e,v) => this.onPasswordChange(e,v)}
                disabled={this.props.loginStatus.inProgress}
                value={this.state.password}
            />
            {this.props.loginStatus.inProgress &&                
                <CircularProgress size={60} thickness={7} />
            }
            {!this.props.loginStatus.inProgress && this.props.loginStatus.status }
            </Dialog>
            <RaisedButton onTouchTap={() => this.handleOpen()} label="Login" />
            </div>
        );
        return (            
            <div>                    
                { !this.props.loginStatus.isLoggedIn && form }
            </div>
        );
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open:true});
    }

    onLoginChange(e,v) {
        this.setState({
            loginUser: e.target.value
        });
    }

    onPasswordChange(e,v) {
        this.setState({
            password: e.target.value
        });
    }
}

export default LoginForm;