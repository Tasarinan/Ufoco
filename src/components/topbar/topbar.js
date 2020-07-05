import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./topbar.scss";
export default class TopBar extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div className={styles.topbar}>
        <svg viewBox="0 0 40 40" height="30" width="30">
          <circle cx="50%" cy="50%" r="15" className={styles.logo} />
        </svg>
        <div className={styles.controls}>
          <div role="button" tabIndex="0">
            <i className="ri-arrow-right-line"></i>
          </div>
          <div role="button" tabIndex="0">
            <i className="ri-toggle-fill"></i>
          </div>
        </div>
      </div>
    );
  }
}
