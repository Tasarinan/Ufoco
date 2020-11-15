import React from "react";
import DayCalendar from "./dayCalendar";
import CalendarNav from "./calendarNav";
import PropTypes from "prop-types";
import moment from "moment";

export default class Agenda extends React.Component {
  static propTypes = {
    slots: PropTypes.array.isRequired,
  };

  timerID = 0;
  scrollTo = 0;
  componentWillMount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    setTimeout(() => {
      const now = moment();
      const minPLuSOne = moment(now).minutes() + 1;
      const minUp = moment(now).minutes(minPLuSOne);
      const dateTillStart = minUp.seconds(0).milliseconds(0);
      const timeToWait = moment(dateTillStart).diff(now, "milliseconds");

      this.tick();
      setTimeout(() => {
        this.tick();
        this.timerID = setInterval(
          () => this.tick(),
          60 * 1000 // each min
        );
      }, timeToWait);
    });
  }

  tick() {
    const dt = moment();
    const startOfDay = moment(dt).startOf("day");
    // Difference in minutes
    const secs = dt.diff(startOfDay, "seconds");
    const pc = (secs / 86400).toFixed(3);
    this.scrollTo = `-${500 * +pc - 100}px`;
  }

  render = () => {
    return (
      <div className="agenda">
        <CalendarNav />
        <div className="agenda-calendar">
          <DayCalendar from={6} to={24} slots={this.props.slots} />
        </div>
      </div>
    );
  };
}

Agenda.defaultProps = {
  slots: [
    { start: 30, end: 90 },
    { start: 300, end: 360 },
    { start: 400, end: 460 },
  ],
};
