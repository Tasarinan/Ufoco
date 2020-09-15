import { SET_THEME } from "../constants/action_types";
import settings from "../utils/electron-settings.util";
const initialState = {
  theme: settings.getTheme(),
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      const { theme } = action;
      return { ...state, theme };
    }

    default: {
      return state;
    }
  }
};
