import Login from "./login";
import { connect } from "react-redux";
import { login } from "../../../actions/auth_action";
const mapStateToProps = (state) => ({
  decryptErrorMsg: state.file.decryptErrorMsg,
  decryptStatus: state.file.decryptStatus,
  userStatus: state.auth.userStatus,
});

const mapDispatchToProps = (dispatch) => ({
  login: (password) => dispatch(login(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
