// Libs
import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./root";

// Styles
import "./assets/styles/styles.scss";

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./root", () => {
    const NextRoot = require("./root"); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
