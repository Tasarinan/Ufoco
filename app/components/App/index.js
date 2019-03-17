import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { openGeneralAlert } from '../GeneralAlerts/actions';
import {
  goToHome,
  goToCharts,
  goToSettings,
  setAppSettings,
  setTheme,
} from './actions';
import {
  loadRoundsData,
  resetSession
} from '../common/Rounds/actions';
import {
  pause,
  resume
} from '../common/MediaControls/actions';

import App from './app';

const mapStateToProps = state => ({
  compact: state.app.compact,
  theme: state.app.theme
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(goToHome()),
  goToCharts: () => dispatch(goToCharts()),
  goToSettings: () => dispatch(goToSettings()),
  loadRoundsData: data => dispatch(loadRoundsData(data)),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  pushRoute: route => dispatch(push(route)),
  resetSession: () => dispatch(resetSession()),
  resume: () => dispatch(resume()),
  setAppSettings: data => dispatch(setAppSettings(data)),
  setTheme: theme => dispatch(setTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
