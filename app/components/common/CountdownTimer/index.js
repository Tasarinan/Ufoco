import { connect } from 'react-redux';

import {
  currentPhase,
  currentRound,
  focusLength,
  longBreakLength,
  shortBreakLength,
  timer,
  totalRounds,
} from '../../../selectors/rounds.selectors';

import {
  pause,
  resume,
  skip,
} from '../MediaControls/actions';
import {
  resetTimer,
} from '../Rounds/actions';
import { openGeneralAlert } from '../GeneralAlerts/actions';

import CountdownTimer from './countdown-timer';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  focusLength: focusLength(state),
  isPlaying: state.mediaControls.isPlaying,
  longBreakLength: longBreakLength(state),
  shortBreakLength: shortBreakLength(state),
  timer: timer(state),
  totalRounds: totalRounds(state)
});

const mapDispatchToProps = dispatch => ({
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  skip: () => dispatch(skip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
