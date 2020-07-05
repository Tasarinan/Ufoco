// Libs
import React, { PureComponent } from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import appIcon from "../../assets/icons/app-icon.png";

// Styles
import styles from "./password.scss";
// Components

export default class Password extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <img src={appIcon} alt="App icon" width={140} height={140} />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}
