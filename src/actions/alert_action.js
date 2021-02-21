import {
  CLOSE_BANNER_ALERT,
  OPEN_BANNER_ALERT,
} from "../constants/action_types";

export const closeBannerAlert = () => {
  return {
    type: CLOSE_BANNER_ALERT,
  };
};

export const openBannerAlert = (message, opts = {}, handleCloseAlert) => {
  return {
    type: OPEN_BANNER_ALERT,
    payload: {
      message: message,
      opts: opts,
      handleCloseAlert: handleCloseAlert,
    },
  };
};
