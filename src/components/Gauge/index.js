import { connect } from "react-redux";
import Gauge from "./gauge";

import { toggleCompactMode } from "../../actions/app_action";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(Gauge);
