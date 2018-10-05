import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@blueprintjs/core';

import { Phases } from '../../../constants/AppSettings';

import { getClockTime, twoDigits } from '../../../utils/countdown-timer.util';

const Option = ({
  currentPhase,
  isLength,
  isPlaying,
  max,
  min,
  phase,
  stepSize,
  title,
  value,
  unit,
  onChange,
}) => {
  const { hours, minutes, seconds } = getClockTime(value);
  return (
    <div className="mb-3 align-items-center">
      <div className="d-flex">
        <div className="d-inline-block w-exact-150 em-0-9">{title} </div>
        <div className="w-exact-100">
          <span className="font-weight-bold">
            {isLength ? `${hours}:${twoDigits(minutes)}:${twoDigits(seconds)}` : value } {unit}
          </span>
        </div>
      </div>
      <Slider
        disabled={currentPhase === phase && isPlaying}
        labelStepSize={max}
        min={min}
        max={max}
        value={value}
        renderLabel={false}
        stepSize={stepSize}
        onChange={val => onChange(val)}
      />
    </div>
  );
};

Option.propTypes = {
  isLength: PropTypes.bool,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  stepSize: PropTypes.number,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default class TimerPanel extends Component {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    focusLength: PropTypes.number.isRequired,
    longBreakLength: PropTypes.number.isRequired,
    longBreakInterval: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shortBreakLength: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    onSettingsChange: PropTypes.func.isRequired,
    setFocusLength: PropTypes.func.isRequired,
    setLongBreakInterval: PropTypes.func.isRequired,
    setLongBreakLength: PropTypes.func.isRequired,
    setShortBreakLength: PropTypes.func.isRequired,
    setTimer: PropTypes.func.isRequired,
    setTotalRounds: PropTypes.func.isRequired,
  };

  // NOTE: Slider on re-render renders the slider fill position to 0
  // even though value is correct. This is a manual check of prop change
  // to update only if any prop values updated (which means client must be on
  // the Timer Panel to trigger own updates)
  shouldComponentUpdate(nextProps) {
    const {
      focusLength,
      longBreakInterval,
      longBreakLength,
      shortBreakLength,
      totalRounds
    } = nextProps;

    return (
      focusLength !== this.props.focusLength ||
      longBreakInterval !== this.props.longBreakInterval ||
      longBreakLength !== this.props.longBreakLength ||
      shortBreakLength !== this.props.shortBreakLength ||
      totalRounds !== this.props.totalRounds
    );
  }

  onFocusChange = val => {
    const { onSettingsChange, setFocusLength } = this.props;
    onSettingsChange('rounds.focusLength', val, setFocusLength);
    this.setNewTime(val, Phases.FOCUS);
  };

  onShortBreakChange = val => {
    const { onSettingsChange, setShortBreakLength } = this.props;
    onSettingsChange('rounds.shortBreakLength', val, setShortBreakLength);
    this.setNewTime(val, Phases.SHORT_BREAK);
  };

  onLongBreakChange = val => {
    const { onSettingsChange, setLongBreakLength } = this.props;
    onSettingsChange('rounds.longBreakLength', val, setLongBreakLength);
    this.setNewTime(val, Phases.LONG_BREAK);
  };

  onLongBreakIntChange = val => {
    const { onSettingsChange, setLongBreakInterval } = this.props;
    onSettingsChange('rounds.longBreakInterval', val, setLongBreakInterval);
  };

  onRoundsChange = val => {
    const { onSettingsChange, setTotalRounds } = this.props;
    onSettingsChange('rounds.totalRounds', val, setTotalRounds);
  };

  setNewTime(val, phase) {
    const { currentPhase, setTimer } = this.props;
    if (currentPhase === phase) setTimer(val);
  }

  render() {
    const MAX_TIME = 5400000;
    const {
      currentPhase,
      focusLength,
      isPlaying,
      longBreakInterval,
      longBreakLength,
      shortBreakLength,
      totalRounds
    } = this.props;

    return (
      <div className="mt-1">
        <Option
          isLength
          title="Focus Length"
          currentPhase={currentPhase}
          phase={Phases.FOCUS}
          isPlaying={isPlaying}
          min={30000}
          max={MAX_TIME}
          stepSize={30000}
          value={focusLength}
          onChange={this.onFocusChange}
        />
        <Option
          isLength
          title="Short Break Length"
          currentPhase={currentPhase}
          phase={Phases.SHORT_BREAK}
          isPlaying={isPlaying}
          max={MAX_TIME}
          stepSize={30000}
          value={shortBreakLength}
          onChange={this.onShortBreakChange}
        />
        <Option
          isLength
          title="Long Break Length"
          currentPhase={currentPhase}
          phase={Phases.LONG_BREAK}
          isPlaying={isPlaying}
          max={MAX_TIME}
          stepSize={30000}
          value={longBreakLength}
          onChange={this.onLongBreakChange}
        />
        <Option
          title="Long Break Interval"
          max={totalRounds}
          unit="rounds"
          value={
            longBreakInterval > totalRounds ? totalRounds : longBreakInterval
          }
          onChange={this.onLongBreakIntChange}
        />
        <Option
          title="Rounds"
          min={1}
          max={100}
          unit="rounds"
          value={totalRounds}
          onChange={this.onRoundsChange}
        />
      </div>
    );
  }
}
