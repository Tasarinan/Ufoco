// Libs
import React from "react";
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

// Styles
import "@/themes/App.global.scss";

render(
  <AppContainer>
  <Root/>
  </AppContainer>,
  document.getElementById('app'));


  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot />
        </AppContainer>,
        document.getElementById('app')
      );
    });
  }
