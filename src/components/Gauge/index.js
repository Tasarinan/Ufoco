import { connect } from "react-redux";
import Gauge from "./gauge";

import { toggleExpandMode } from "../../actions/app_action";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  toggleExpandMode: () => dispatch(toggleExpandMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gauge);
