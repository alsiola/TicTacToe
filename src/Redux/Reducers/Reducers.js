import * as actions from '../Actions';
import {calcNextMove, canMakeMove, checkForWinner} from './Helpers';

export function squares(state = [], action) {
    switch (action.type){
        case actions.PLAY_TURN:
            const updatedSquares = action.squares.slice();
            if (canMakeMove(updatedSquares, action.squareNum)) {
                updatedSquares[action.squareNum] = action.letter;
                if (action.aiPlayer && checkForWinner(updatedSquares).length===0) {
                    const aiMove = calcNextMove(updatedSquares, action.aiLetter);
                    updatedSquares[aiMove] = action.aiLetter;
                }
            }            
            return updatedSquares;
        case actions.LOAD_GAME:
            return action.game.history[0].squares;
        case actions.RESET_GAME:
            return [];
        case actions.LOAD_HISTORY_ENTRY:
            return action.squares;
        default:
            return state;
    }
}

export function currentStep(state = -1, action) {
    switch (action.type) {
        case actions.PLAY_TURN:
            if(!canMakeMove(action.squares, action.squareNum)) {
                return state;
            }
            return action.aiPlayer ? state + 2 : state + 1;
        case actions.RESET_GAME:
        case actions.LOAD_GAME:
            return -1;
        case actions.LOAD_HISTORY_ENTRY:
            return action.step;
        default:
            return state;
    }
}

export function winningLine(state = [], action) {    
    switch (action.type){
        case actions.PLAY_TURN:
            return checkForWinner(squares(action.squares.slice(), action));
        case actions.LOAD_HISTORY_ENTRY:
            return checkForWinner(squares(action.squares, action));
        case actions.RESET_GAME:
        case actions.LOAD_GAME:
            return [];
        default:
            return state;
    }
}

export function winningLetter(state = '', action) {
    switch (action.type) {
        case actions.PLAY_TURN:
            const winningLine = checkForWinner(squares(action.squares.slice(), action));
            if (winningLine.length > 0) {
                return action.squares[winningLine[0]];
            } else {
                return state;
            }
        case actions.RESET_GAME:
            return '';
        case actions.LOAD_HISTORY_ENTRY:
            const winLine = checkForWinner(action.squares);
            if (winLine.length > 0) {
                return action.squares[winLine[0]];
            } else {
                return '';
            }
        default: 
            return state;
    }
}

export function history(state = [], action) {
    switch (action.type) {
        case actions.PLAY_TURN:
            const previous = state.slice();
            if (canMakeMove(action.squares, action.squareNum)) {
                const afterPlayerTurnSquares = squares(action.squares.slice(), Object.assign({}, action, {aiPlayer: false}));
                previous.push({
                    squares: afterPlayerTurnSquares,
                    step: state.length
                });
                if (action.aiPlayer && checkForWinner(afterPlayerTurnSquares).length === 0 && state.length < 8) {
                    previous.push({
                        squares: squares(action.squares.slice(), action),
                        step: state.length + 1
                    });
                }
            }
            return previous;
        case actions.RESET_GAME:
            return [];
        case actions.LOAD_GAME:
            return action.game.history.slice();
        default:
            return state
    }
}

export function gameHistory(state = [], action) {
    switch (action.type) {
        case actions.GAMES_LOADED:
            return action.games.map(item => {
                return {
                    gameNumber: item._id,
                    history: item.history
                };
            });
        default:
            return state;
    }
}

export function gameOptions(state = {historyOrderAsc: true, aiPlayer: true}, action) {
    switch (action.type) {
        case actions.TOGGLE_HX_ORDER:
            return Object.assign({}, state, {
                historyOrderAsc: !state.historyOrderAsc
            });
        case actions.SET_AI_VALUE:
            return Object.assign({}, state, {
                aiPlayer: action.value
            });
        default:
            return state;
    }
}

export function currentReplay(state = 0, action) {
    switch (action.type) {
        case actions.LOAD_GAME:
            return action.game.gameNumber;
        case actions.RESET_GAME:
            return 0;
        default:
            return state;
    }
}

export function loginStatus(state = {isLoggedIn:false, status:"", inProgress: false}, action) {
    switch (action.type) {
        case actions.USER_LOGGED_IN:
            return {
                isLoggedIn: true,
                status: "Logged in as " + action.username,
                inProgress: false
            };
        case actions.LOGIN_FAILED:
            return {
                isLoggedIn: false,
                status: "Login failed",
                inProgress: false
            };
        case actions.LOGIN_ATTEMPT_STARTED:
            return {
                isLoggedIn: false,
                status: "Logging in",
                inProgress: true
            };
        default:
            return state;
    }
}

export function saveGameStatus(state='', action) {
    switch (action.type) {
        case actions.GAME_SAVED:
            return "Game saved";
        case actions.GAME_SAVE_FAILED:
            return action.msg;
        case actions.GAMES_LOADED:
            return state;
        default:
            return '';
    }
}