import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "./divisors.scss";

const Divisors = ({ startHour, totalMinutes, totalMinutesPerDivisor }) => {
  const totalDivisors = totalMinutes / totalMinutesPerDivisor;
  const divisors = [];
  const times = [];

  for (let i = 1; i < totalDivisors; i += 1) {
    const positionStyle = {
      top: `${i * totalMinutesPerDivisor}px`
    };

    divisors.push(
      <div key={i} style={positionStyle} className={styles.calendar__divisor} />
    );
  }

  const totalMinutesPerTime = totalMinutesPerDivisor / 2;
  const totalTimes = totalMinutes / totalMinutesPerTime;
  for (let i = 0; i <= totalTimes; i += 1) {
    const positionStyle = {
      top: `${i * totalMinutesPerTime}px`,
      fontWeight:
        (i * totalMinutesPerTime) % totalMinutesPerDivisor === 0
          ? "bold"
          : "regular"
    };

    times.push(
      <div
        key={i}
        style={positionStyle}
        className={styles.calendar__divisor__time}
      >
        {moment()
          .set("hour", startHour || 6)
          .set("minute", i * totalMinutesPerTime)
          .format("HH:mm")}
      </div>
    );
  }

  return (
    <div>
      {divisors}
      {times}
    </div>
  );
};

Divisors.propTypes = {
  startHour: PropTypes.number,
  totalMinutes: PropTypes.number.isRequired,
  totalMinutesPerDivisor: PropTypes.number.isRequired
};

export default Divisors;
