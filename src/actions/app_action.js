import { ipcRenderer } from "electron";
import { push } from "react-router-redux";
import { ON_CHANGE_WINDOW_SIZE } from "../constants/ipc_channels";
import { TOGGLE_COMPACT_MODE, SET_OVERLAY } from "../constants/action_types";
import { Routes, ViewSize } from "../constants/enums";

export const goToHome = () => (dispatch) => {
  dispatch(push(Routes.HOME));
  ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ViewSize.NORMAL);
};

export const toggleCompactMode = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_COMPACT_MODE });
  const {
    app: { compact },
  } = getState();
  ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, compact);
};
export const adjustWinSize = (winsize) => {
  ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, winsize);
};

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});
