import { connect } from "react-redux";
import PrivateRoute from "./private-route";

const mapStateToProps = (state) => ({
  isInitialized: state.auth.isInitialized,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
