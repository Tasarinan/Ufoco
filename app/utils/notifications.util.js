import { remote } from 'electron';
import settings from 'electron-settings';

import { NotificationTypes, Phases } from '../constants/AppSettings';
import { getLogo } from '../utils/logo.util';

export const triggerNotification = (phase) => {
  const notificationType = settings.get(
    'system.notificationType',
    NotificationTypes.PHASE_CHANGES_NO_WINDOW
  );

  let title;
  let body;
  const icon = getLogo();

  switch (phase) {
    case Phases.FOCUS:
      title = 'Focus phase over';
      body = 'Time to take a break';
      break;
    case Phases.SHORT_BREAK:
      title = 'Short break phase over';
      body = 'Back to focus!';
      break;
    case Phases.LONG_BREAK:
      title = 'Long break phase over';
      body = 'Back to focus!';
      break;
    default: {
      title = 'Thinking...';
      body = 'What to do, what to do...';
    }
  }

  switch (notificationType) {
    case NotificationTypes.PHASE_CHANGES_ALL: {
      new Notification(title, { body, icon }); // eslint-disable-line no-new
      break;
    }
    case NotificationTypes.PHASE_CHANGES_NO_WINDOW: {
      const win = remote.getCurrentWindow();
      const isFocused = win.isFocused();
      if (!isFocused) new Notification(title, { body, icon }); // eslint-disable-line no-new
      break;
    }
    default: {
      new Notification(title, { body, icon }); // eslint-disable-line no-new
    }
  }
};
