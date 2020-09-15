import App from "./app";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  theme: state.app.theme,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
