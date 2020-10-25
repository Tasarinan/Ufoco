import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Date from "./today-date";
import Score from "./today-score";
import ProgressBar from "./customizableProgressbar";

export default class Gauge extends PureComponent {
  static propTypes = { toggleExpandMode: PropTypes.func.isRequired };

  render() {
    const { toggleExpandMode } = this.props;
    return (
      <div className="gauge">
        <div className="gauge-progressbar">
          <ProgressBar></ProgressBar>
        </div>
        <div className="gauge-overlay">
          <div className="gauge-mask"></div>
          <div className="gauge-dateContainer">
            <div className="gauge-date">
              <Date />
            </div>
            <button
              className="gauge-expandButton"
              onClick={toggleExpandMode}
            ></button>
          </div>
          <div className="gauge-right">
            <Score />
          </div>
        </div>
      </div>
    );
  }
}
