import React, {Component} from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './Redux/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReduxContainer from './Redux/ReduxContainer';

class App extends Component {
  constructor() {
    super();
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <ReduxContainer />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App