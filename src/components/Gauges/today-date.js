import React from "react";
import styles from "./today-date.scss";

import moment from "moment";

export default function TodayDate() {
  const date = {
    day: moment().date(),
    month: moment().format("MMM"),
    year: moment().year(),
    weekday: moment().format("ddd")
  };

  return (
    <div className={styles.date}>
      <div className={styles.calendar}>
        <div className={styles.day}>{date.day}</div>
        <div className={styles.my}>
          <div className={styles.month}>{date.month}</div>
          <div className={styles.year}>{date.weekday}</div>
        </div>
      </div>
    </div>
  );
}
