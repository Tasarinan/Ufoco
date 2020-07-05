// Libs
import React, { PureComponent } from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { Alert } from "antd";
// Styles
import styles from "./banner.scss";
// Components

export default class Banner extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.banner}></div>;
  }
}
