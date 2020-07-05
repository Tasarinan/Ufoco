import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Stage from "./stage";
import Divisors from "./divisors";
import styles from "./dayCalendar.scss";

export default class DayCalendar extends PureComponent {
  static propTypes = {
    stages: PropTypes.array.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired
  };

  stages = totalMinutes => {
    if (!this.props.stages) {
      return false;
    }

    return this.props.stages.map((stage, key) => {
      return (
        <Stage
          start={stage.start}
          end={stage.end}
          widthDivisor={stage.widthDivisor}
          position={stage.position}
          key={key}
        />
      );
    });
  };

  render = () => {
    const totalMinutesPerDivisor = 60;
    const totalMinutes =
      (this.props.to - this.props.from) * totalMinutesPerDivisor;
    const calendarStyle = {
      height: `${totalMinutes}px`
    };

    return (
      <div style={calendarStyle} className={styles.calendar__container}>
        {this.stages(totalMinutes)}
        <Divisors
          totalMinutes={totalMinutes}
          totalMinutesPerDivisor={totalMinutesPerDivisor}
        />
      </div>
    );
  };
}
