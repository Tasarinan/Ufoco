import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Route } from "react-router-dom";

export default class TodayScore extends PureComponent {
  static propTypes = {
    remainingHours: PropTypes.number.isRequired,
    remainingEpics: PropTypes.number.isRequired,
    totalHours: PropTypes.number.isRequired,
    totalEpics: PropTypes.number.isRequired,
  };

  render() {
    const {
      remainingHours,
      remainingEpics,
      totalHours,
      totalEpics,
    } = this.props;
    return (
      <div className="gauge-score">
        <div className="gauge-score-items">
          {remainingEpics}/{totalEpics}
        </div>
        <NavLink to="/admin" className="gauge-score-percentage">
          {totalEpics}%
        </NavLink>
        <div className="gauge-score-hour">
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
  totalEpics: 15,
};
