import MiniView from "./miniview";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  expandMode: state.app.expandMode,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MiniView);
