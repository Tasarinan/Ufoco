import { ipcRenderer } from 'electron';
import { push } from 'react-router-redux';

import {
  SET_APP_SETTINGS,
  SET_ELECTRON_SETTINGS,
  SET_NOTIFICATIONS_TYPE,
  SET_CONTINUOUS_MODE,
  SET_THEME,
  TOGGLE_MINIMIZE_TO_TRAY,
  TOGGLE_SHOW_TIMER_BY_TRAY,
  TOGGLE_SHOW_TRAY_ICON,
} from './types';

import { Routes } from '../../constants/AppSettings';

export const goToHome = () => dispatch => {
  dispatch(push(Routes.HOME));
};

export const goToCharts = () => dispatch => {
  dispatch(push(Routes.CHARTS));
};

export const goToLibrary = () => dispatch => {
  dispatch(push(Routes.LIBRARY));
};

export const goToSettings = () => dispatch => {
  dispatch(push(Routes.SETTINGS));
};

export const setAppSettings = data => ({
  type: SET_APP_SETTINGS,
  data
});

export const setElectronSettings = (keyPath, value, options = {}) => ({
  type: SET_ELECTRON_SETTINGS,
  keyPath,
  value,
  options
});

export const setNotificationType = notificationType => ({
  type: SET_NOTIFICATIONS_TYPE,
  notificationType
});

export const setContinuousMode = bool => ({
  type: SET_CONTINUOUS_MODE,
  bool
});

export const setTheme = theme => ({
  type: SET_THEME,
  theme
});

export const toggleMinimizeToTray = () => ({
  type: TOGGLE_MINIMIZE_TO_TRAY
});

export const toggleShowTimerByTray = () => ({
  type: TOGGLE_SHOW_TIMER_BY_TRAY
});

export const toggleShowTrayIcon = () => ({
  type: TOGGLE_SHOW_TRAY_ICON
});
