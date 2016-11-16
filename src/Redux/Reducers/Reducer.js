import * as reducers from './Reducers';
import {combineReducers} from 'redux';

const ticTacApp = combineReducers(reducers);

export default ticTacApp