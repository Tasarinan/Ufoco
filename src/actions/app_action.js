import { ipcRenderer } from "electron";
import { push } from "react-router-redux";
import { ON_CHANGE_WINDOW_SIZE } from "../constants/ipc_channels";
import { Routes, ScreenSize } from "../constants/enums";
import { SET_THEME, TOGGLE_AGENDA_MODE } from "../constants/action_types";

export const toggleExpandMode = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_AGENDA_MODE });
  const {
    app: { expandMode },
  } = getState();
  if (expandMode) ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.EXPAND);
  else ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.NAV);
};

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});
