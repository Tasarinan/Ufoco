import { CLOSE_GENERAL_ALERT, OPEN_GENERAL_ALERT } from './types';

const initialState = {
  cancelText: null,
  confirmText: 'OK',
  alertType:"info",
  isOpen: false,
  message: '',
  onConfirm: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_GENERAL_ALERT: {
      return { ...initialState };
    }

    case OPEN_GENERAL_ALERT: {
      const { message, opts, onConfirm } = action;
      return {
        ...state,
        message,
        onConfirm,
        cancelText: opts.cancelText || null,
        confirmText: opts.confirmText || state.confirmText,
        alertType: opts.alertType || state.alertType,
        isOpen: true
      };
    }

    default: {
      return state;
    }
  }
};
