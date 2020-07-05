import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./today-score.scss";

export default class TodayScore extends PureComponent {
  static propTypes = {
    remainingHours: PropTypes.number.isRequired,
    remainingEpics: PropTypes.number.isRequired,
    totalHours: PropTypes.number.isRequired,
    totalEpics: PropTypes.number.isRequired
  };

  render() {
    const {
      remainingHours,
      remainingEpics,
      totalHours,
      totalEpics
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.epic}>
          {remainingEpics}/{totalEpics}
        </div>
        <div className={styles.percentage}>{totalEpics}%</div>
        <div className={styles.hours}>
          {remainingHours}/{totalHours}
        </div>
      </div>
    );
  }
}
TodayScore.defaultProps = {
  remainingHours: 6,
  remainingEpics: 8,
  totalHours: 11,
  totalEpics: 15
};
