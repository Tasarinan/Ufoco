import { connect } from "react-redux";
import StatsOverlay from "./stats-overlay";
import { closeOverlay } from "../../actions/app_action";
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  closeOverlay: () => dispatch(closeOverlay())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsOverlay);
