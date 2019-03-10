import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

export default class GenAlert extends PureComponent {
  static propTypes = {
    cancelText: PropTypes.string,
    className: PropTypes.string,
    closeGeneralAlert: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired,
    alertType: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    onConfirm: PropTypes.func
  };

  whenConfirm = () => {
    const { closeGeneralAlert, onConfirm } = this.props;
    if (typeof onConfirm === 'function') onConfirm();
    closeGeneralAlert();
  };

  render() {
    const {
      cancelText,
      className,
      closeGeneralAlert,
      confirmText,
      alertType,
      isOpen,
      message,
    } = this.props;

    return isOpen?(
      <Alert
        message={message}
        closeText={cancelText}
        type={alertType}
        showIcon
        onClose={closeGeneralAlert}
      />):null
    }
}
