import { connect } from 'react-redux';

import { toggleCompactMode } from '../App/actions';

import { currentPhase, timer } from '../../selectors/rounds.selectors';

import MiniView from './mini-view';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  timer: timer(state),
});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniView);
