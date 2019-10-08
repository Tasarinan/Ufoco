import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store,history} from '../store';
import Routes from '../routes';


class Root extends Component {
  render() {
    return(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <HashRouter >
            <Routes />
          </HashRouter>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
