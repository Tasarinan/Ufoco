// Libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// Styles
import styles from "./app.scss";
// Components

/**
 * App
 *
 * @class App
 * @extends {Component}
 */
export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div className={styles.app}>{children}</div>;
  }
}
