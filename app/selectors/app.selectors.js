import { createSelector } from 'reselect';

import { app } from './common.selectors';

export const minimizeToTray = createSelector(
  app,
  a => a.minimizeToTray
);

export const notificationType = createSelector(
  app,
  a => a.notificationType
);

export const showTimerByTray = createSelector(
  app,
  a => a.showTimerByTray
);

export const showTrayIcon = createSelector(
  app,
  a => a.showTrayIcon
);

export const theme = createSelector(
  app,
  a => a.theme
);
