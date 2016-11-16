import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from './Redux/ActionCreators';
import TicTacToeApp from './TicTacToeApp';

const mapStateToProps = state => {
    return {
        squares: state.squares,
        currentStep: state.currentStep,
        winningLine: state.winningLine,
        history: state.history,
        gameHistory: state.gameHistory,
        gameOptions: state.gameOptions,
        currentReplay: state.currentReplay,
        isReplayedGame: state.currentReplay !== 0,
        aiPlayer: state.aiPlayer,
        loginStatus: state.loginStatus,
        saveGameStatus: state.saveGameStatus
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
        },
        onPlayClick: (squareNum, letter, squares, aiPlayer, aiLetter) => {
            dispatch(actionCreators.playTurn(squareNum, letter, squares, aiPlayer, aiLetter))
        },
        gameWon: winningLine => {
            dispatch(actionCreators.gameWon(winningLine))
        },
        loadHistoryEntry: (step, squares) => {
            dispatch(actionCreators.loadHistoryEntry(step, squares))
        },
        reset: (history, save) => {
            dispatch(actionCreators.resetGame());
            if (save) {
                axios.post('/api/games', {
                    history: history
                }).then(
                    response => {
                        if(response.data.success) {
                            dispatch(actionCreators.gameSaved());
                            loadGamesFromServer(dispatch);
                        } else {
                            dispatch(actionCreators.gameSaveFailed("Could not save game"));
                        }
                    },
                    error => {
                        dispatch(actionCreators.gameSaveFailed("Server did not respond"));
                    }
                );
            }    
        },
        loadGames: () => {
            loadGamesFromServer(dispatch);
        },
        toggleHxOrder: () => {
            dispatch(actionCreators.toggleHxOrder())
        },
        toggleAI: newValue => {
            dispatch(actionCreators.setAIValue(newValue))
        },
        loadGame: game => {
            dispatch(actionCreators.loadGame(game))
        }
    }
}

function loadGamesFromServer(dispatch) {
    axios.get('/api/games').then(response => {
        dispatch(actionCreators.gamesLoaded(response.data));
    });
}

const TicTacToeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TicTacToeApp)

export default TicTacToeContainer