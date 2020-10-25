import { SET_THEME, TOGGLE_AGENDA_MODE } from "../constants/action_types";
import settings from "../utils/electron-settings.util";
const initialState = {
  theme: settings.getTheme(),
  expandMode: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      const { theme } = action;
      return { ...state, theme };
    }
    case TOGGLE_AGENDA_MODE: {
      const { expandMode: expandMode } = state;
      return { ...state, expandMode: !expandMode };
    }

    default: {
      return state;
    }
  }
};
