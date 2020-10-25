import Login from "./login";
import { connect } from "react-redux";
import { login } from "../../../actions/auth_action";
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
