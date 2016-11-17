import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../Redux/ActionCreators';
import TicTacToeGame from './TicTacToeGame';
import loadGamesFromServer from './Functions/loadGamesFromServer';

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
        saveGameStatus: state.saveGameStatus,        
        loginStatus: state.loginStatus,
        winningLetter: state.winningLetter
    }
}

const mapDispatchToProps = dispatch => {
    return {
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

const TicTacToeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TicTacToeGame)

export default TicTacToeContainer