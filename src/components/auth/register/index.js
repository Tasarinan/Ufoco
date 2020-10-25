import Register from "./register";
import { connect } from "react-redux";

import { register } from "../../../actions/auth_action";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  register: (emailaddress, password, encryptedMode) =>
    dispatch(register(emailaddress, password, encryptedMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
