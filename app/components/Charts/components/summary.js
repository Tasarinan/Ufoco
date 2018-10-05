import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { getClockTime, twoDigits } from '../../../utils/countdown-timer.util';

const Summary = ({ data, className }) => {
  const rounds = data.reduce((sum, session) => sum + (session.rounds || 0), 0);
  const focusLength = data.reduce((sum, session) => sum + (session.focusLength || 0), 0);
  const longBreakLength = data.reduce((sum, session) => sum + (session.longBreakLength || 0), 0);
  const shortBreakLength = data.reduce((sum, session) => sum + (session.shortBreakLength || 0), 0);

  const focus = getClockTime(focusLength);
  const longBreak = getClockTime(longBreakLength);
  const shortBreak = getClockTime(shortBreakLength);

  const containerStyles = cn(
    'd-flex',
    'justify-content-around',
    'font-small',
    className
  );

  return (
    <div className={containerStyles}>
      <div>Rounds: {rounds}</div>
      <div>Focus: {focus.hours}:{twoDigits(focus.minutes)}</div>
      <div>Short Break: {longBreak.hours}:{twoDigits(longBreak.minutes)}</div>
      <div>Long Break: {shortBreak.hours}:{twoDigits(shortBreak.minutes)}</div>
    </div>
  );
};

Summary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      focusLength: PropTypes.number,
      shortBreakLength: PropTypes.number,
      longBreakLength: PropTypes.number,
      rounds: PropTypes.number
    })
  ).isRequired,
  className: PropTypes.string
};

export default Summary;
