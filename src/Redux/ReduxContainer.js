import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from './ActionCreators';
import LayoutComponent from '../Layout/LayoutComponent';
import loadGamesFromServer from '../TicTacToe/Functions/loadGamesFromServer';

const mapStateToProps = state => {
    return {
        loginStatus: state.loginStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user, pass) => {
            dispatch(actionCreators.loginAttemptStarted());
            axios.post('/login', {
                login: user,
                password: pass
            }).then(
                response => {
                    if (response.data.account.status === "ENABLED") {
                        dispatch(actionCreators.userLoggedIn(response.data.account.username));
                        loadGamesFromServer(dispatch);
                    } else {
                        dispatch(actionCreators.loginFailed());
                    }
                },
                error => {
                    dispatch(actionCreators.loginFailed());
                }
            )
        }
    };
}

const ReduxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutComponent)

export default ReduxContainer