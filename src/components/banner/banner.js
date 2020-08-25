// Libs
import React, { PureComponent } from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { Alert } from "antd";
// Styles
import styles from "./banner.scss";
// Components

export default class Banner extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    showIcon: PropTypes.bool,
    banner: PropTypes.bool,
    closable: PropTypes.bool,
    message: PropTypes.string.isRequired,
    alertType: PropTypes.string.isRequired,
    handleCloseAlert: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleCloseAlert,
      showIcon,
      banner,
      closable,
      isOpen,
      alertType,
      message,
    } = this.props;

    return (
      isOpen && (
        <div className={styles.banner}>
          <Alert
            message={message}
            type={alertType}
            closable={closable}
            showIcon={showIcon}
            banner={banner}
            afterClose={handleCloseAlert}
          />
        </div>
      )
    );
  }
}
