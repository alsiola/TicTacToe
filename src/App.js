import React, {Component} from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TicTacToeContainer from './TicTacToeContainer';
import store from './Redux/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
  constructor() {
    super();
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <TicTacToeContainer />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App