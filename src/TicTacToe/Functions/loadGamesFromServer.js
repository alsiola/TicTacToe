import axios from 'axios';
import * as actionCreators from '../../Redux/ActionCreators';

export default function loadGamesFromServer(dispatch) {
    axios.get('/api/games').then(response => {
        dispatch(actionCreators.gamesLoaded(response.data));
    });
}