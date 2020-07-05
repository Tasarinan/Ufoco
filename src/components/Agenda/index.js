import { connect } from "react-redux";
import Agenda from "./agenda";
import { openOverlay } from "../../actions/app_action";
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  openOverlay: () => dispatch(openOverlay())
});

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
