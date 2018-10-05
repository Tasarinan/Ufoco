/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import path from 'path';
import { app, ipcMain } from 'electron';
import settings from './utils/electron-settings.util';
import { isDebugProd, isDev, isProd } from './utils/env.util';
import { installExtensions } from './utils/install-extensions.util';
import { CREATE_WELCOME_WINDOW_ON_MAIN } from './constants/AppConstants';
import log from './utils/log.util';

import FocoMain from './main';

if (isProd()) {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line global-require
  sourceMapSupport.install();
}

if (isDev() || isDebugProd) {
  require('electron-debug')(); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); // eslint-disable-line global-require
}

let Main = null;

app.on('activate', (e, hasVisibleWindows) => {
  if (!hasVisibleWindows) Main.show();
});

app.on('window-all-closed', () => {
  app.quit();
});


app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  // DANGER: Use wisely. This will delete their settings in local
  settings.flush('DONE_FLUSH', { chart: false });
  Main = FocoMain.init(`file://${__dirname}/app.html`).window;
});

ipcMain.on(CREATE_WELCOME_WINDOW_ON_MAIN, (win) => {
  win.loadURL(`file://${__dirname}/welcome.html`);
});
