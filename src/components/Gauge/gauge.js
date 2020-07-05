import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./gauges.scss";
import Date from "./today-date";
import Score from "./today-score";

import ProgressBar from "./customizableProgressbar";

export default class Gauge extends PureComponent {
  static propTypes = { toggleCompactMode: PropTypes.func.isRequired };

  render() {
    const { toggleCompactMode } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.progressbar}>
          <ProgressBar></ProgressBar>
        </div>
        <div className={styles.overlay}>
          <div className={styles.mask}></div>
          <div className={styles.dateContainer}>
            <div className={styles.date}>
              <Date />
            </div>
            <button
              className={styles.expandButton}
              onClick={toggleCompactMode}
            ></button>
          </div>
          <div className={styles.right}>
            <Score />
          </div>
        </div>
      </div>
    );
  }
}
