import React from "react";
import PropTypes from "prop-types";

export default class TimeSlot extends React.Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    headline: PropTypes.string,
    widthDivisor: PropTypes.number,
    position: PropTypes.number,
  };

  render() {
    const {
      start,
      end,
      headline,

      widthDivisor,
      position,
    } = this.props;
    const stageStyle = {
      height: `${end - start}px`,
      top: `${start}px`,
      left: `${(100 / widthDivisor) * position}%`,
      width: `calc(${100 / widthDivisor}% - 8px`,
    };

    return (
      <div style={stageStyle} className="agenda-calendar-timeslot">
        <div className="agenda-calendar-timeslot-headline">{headline}</div>
      </div>
    );
  }
}
