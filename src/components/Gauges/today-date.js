import React from 'react';
import styles from './today-date.scss';

import moment from 'moment';

export default function TodayDate() {

  const date = {
    day:moment().date(),
    month: moment().format('MMM'),
    year: moment().year(),
    weekday: moment().format('dddd')
  };

  return (
    <div className={styles.container}>
      <div className={styles.month}>{date.month}</div>
      <div className={styles.number}>{date.day}</div>
      <div className={styles.day}>{date.weekday}</div>
    </div>
  );

}
