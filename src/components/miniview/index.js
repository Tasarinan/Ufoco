import Home from "./home";
import { connect } from "react-redux";
import { toggleCompactMode } from "../../actions/app_action";
const mapStateToProps = state => ({
  compact: state.app.compact,
  overlay: state.app.overlay
});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
