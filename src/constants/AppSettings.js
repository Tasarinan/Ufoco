
// SEND
export const LOAD_CHARTS = 'LOAD_CHARTS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SEND_CHECKING_FOR_UPDATES = 'SEND_CHECKING_FOR_UPDATES';
export const SEND_ERROR = 'SEND_ERROR';
export const SEND_NEEDS_UPDATE = 'SEND_NEEDS_UPDATE';

// ON
export const ON_ACCEPT_UPDATE = 'ON_ACCEPT_UPDATE';

// EVENTS
export const CHECK_FOR_UPDATES = 'CHECK_FOR_UPDATES';
export const DESTROY_TRAY_ICON = 'DESTROY_TRAY_ICON';
export const UPDATE_TRAY_ICON = 'UPDATE_TRAY_ICON';
export const UPDATE_TRAY_TIMER = 'UPDATE_TRAY_TIMER';


export const NotificationTypes = {
  PHASE_CHANGES_NO_WINDOW: 'phase-changes-no-window',
  PHASE_CHANGES_ALL: 'phase-changes-all',
};

export const Phases = {
  IMMERSION: 0,
  SHORT_BREAK: 1,
  LONG_BREAK: 2,
  TRANSITION: 3
};

export const Routes = {
  HOME: '/',
  CHARTS: '/charts',
  LIBRARY: '/library',
  SETTINGS: '/settings'
};

export const Sounds = {
  CORSICA_DING: '4111001',
  TICK: '4111002',
  WATER_DROP: '4111003'
};

export const SoundTypes = {
  SONG: 'SONG',
  TICK: 'TICK',
};

export const Themes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};
export const MediaControlTypes = {
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  SKIP: 'SKIP',
  STOP:'STOP'
}

