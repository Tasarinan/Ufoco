import { connect } from 'react-redux';

import {
  currentPhase,
  currentRound,
  totalRounds,
} from '../../../selectors/rounds.selectors';

import { pause, resume, skip } from './actions';
import { openGeneralAlert } from '../GeneralAlerts/actions';
import { resetTimer } from '../Rounds/actions';

import MediaControls from './media-controls';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  isPlaying: state.mediaControls.isPlaying,
  totalRounds: totalRounds(state),
});

const mapDispatchToProps = dispatch => ({
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  skip: () => dispatch(skip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaControls);
