import { connect } from "react-redux";

import Banner from "./banner";
import { closeBannerAlert } from "../../actions/alert_action";

const mapStateToProps = (state) => ({
  isOpen: state.alerts.isOpen,
  showIcon: state.alerts.showIcon,
  banner: state.alerts.banner,
  closable: state.alerts.closable,
  message: state.alerts.message,
  alertType: state.alerts.alertType,
  handleCloseAlert: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  closeBannerAlert: () => dispatch(closeBannerAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
