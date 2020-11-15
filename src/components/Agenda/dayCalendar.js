import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TimeSlot from "./timeslot";
import Divisors from "./divisors";

export default class DayCalendar extends PureComponent {
  static propTypes = {
    slots: PropTypes.array.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  };

  stages = (totalMinutes) => {
    if (!this.props.slots) {
      return false;
    }

    return this.props.slots.map((slot, key) => {
      return (
        <TimeSlot
          start={slot.start}
          end={slot.end}
          widthDivisor={slot.widthDivisor}
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
      height: `${totalMinutes}px`,
    };

    return (
      <div style={calendarStyle} className="agenda-daycalendar">
        {this.stages(totalMinutes)}
        <Divisors
          totalMinutes={totalMinutes}
          totalMinutesPerDivisor={totalMinutesPerDivisor}
        />
      </div>
    );
  };
}
