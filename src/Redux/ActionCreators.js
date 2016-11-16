import * as actions from './Actions';

export function userLoggedIn(username) {
    return {
        type: actions.USER_LOGGED_IN,
        username
    }
}

export function loginAttemptStarted() {
    return {
        type: actions.LOGIN_ATTEMPT_STARTED
    }
}

export function loginFailed() {
    return {
        type: actions.LOGIN_FAILED
    }
}

export function gameSaved(msg) {
    return {
        type: actions.GAME_SAVED
    }
}

export function gameSaveFailed(msg) {
    return {
        type: actions.GAME_SAVE_FAILED,
        msg
    }
}

export function loadGame(game) {
    return {
        type: actions.LOAD_GAME,
        game
    }
}

export function setAIValue(value) {
    return {
        type: actions.SET_AI_VALUE,
        value
    }
}

export function toggleHxOrder() {
    return {
        type: actions.TOGGLE_HX_ORDER
    }
}

export function resetGame() {
    return {
        type: actions.RESET_GAME
    }
};

export function gamesLoaded(games) {
    return {
        type: actions.GAMES_LOADED,
        games
    }
}

export function playTurn(squareNum, letter, squares, aiPlayer, aiLetter) {    
    return {
        type: actions.PLAY_TURN,
        squareNum,
        letter,
        squares,
        aiPlayer,
        aiLetter
    };
};

export function gameWon(winningLine) {
    return {
        type: actions.GAME_WON,
        winningLine
    }
};

export function loadHistoryEntry(step, squares) {
    return {
        type: actions.LOAD_HISTORY_ENTRY,        
        step,
        squares
    }
};