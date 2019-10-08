// Libs
import React, { Component } from "react";
import PropTypes from "prop-types";

// Styles
import styles from "./App.scss";
// Components
import { isMacOS } from '../utils/platform.util';
import MenuBar from '../components/@shared/menu-bar';

/**
 * App
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.app}>
        {!isMacOS()&&<MenuBar />}
        {children}
      </div>
    );
  }
}

export default App;
