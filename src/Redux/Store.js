import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ticTacToe from './Reducers/Reducer';

const logger = createLogger();

const store = createStore(
    ticTacToe,
    applyMiddleware(thunk, logger)
);

export default store