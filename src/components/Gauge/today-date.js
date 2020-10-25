import React from "react";

import moment from "moment";

export default function TodayDate() {
  const date = {
    day: moment().date(),
    month: moment().format("MMM"),
    year: moment().year(),
    weekday: moment().format("ddd"),
  };

  return (
    <div className="gauge-today-date">
      <div className="gauge-today-calendar">
        <div className="gauge-today-day">{date.day}</div>
        <div className="gauge-today-my">
          <div>{date.month}</div>
          <div>{date.weekday}</div>
        </div>
      </div>
    </div>
  );
}
