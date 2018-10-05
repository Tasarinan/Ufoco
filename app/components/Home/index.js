import { connect } from 'react-redux';

import { pause, resume } from '../common/MediaControls/actions';

import Home from './home';

const mapStateToProps = state => ({
  isPlaying: state.mediaControls.isPlaying
});

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  resume: () => dispatch(resume())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
