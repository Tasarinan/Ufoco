import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

import {
  CREATE_WELCOME_WINDOW_ON_MAIN,
  OPEN_WELCOME_WINDOW,
 } from '../constants/AppConstants';

import { ElectronSettingsPaths } from '../constants/AppSettings';

import settings from '../utils/electron-settings.util';
import { isMacOS, isLinux } from '../utils/platform.util';
import { setWindowSize } from '../utils/windows.util';

import FocoMenu from './menu';
import FocoTray from './tray';
import FocoUpdater from './updater';

class FocoMain {
  menu = null;
  path = null;
  tray = null;
  updater = null;
  window = null;

  windowConfiguration = {
    frame: true,
    titleBarStyle: 'hidden-inset',
    fullscreenable: true,
    backgroundColor: '#403F4D',
    icon: isMacOS() || isLinux()
      ? path.join(__dirname, '../../resources/icons/mac/64x64.png')
      : path.join(__dirname, '../../resources/icons/windows/64x64.png'),
  };

  init(appPath) {
    this.path = appPath;
    this.createMainWindow();
    this.createMenu();
    this.createTray();
    this.createUpdater();
    this.setListeners();
    this.load();
    return this;
  }

  createMenu() {
    this.menu = FocoMenu.init(this.window);
  }

  createTray() {
    this.tray = FocoTray.init(this.window);
  }

  createUpdater() {
    this.updater = FocoUpdater.init(this.window);
  }

  createMainWindow() {
    const { COMPACT } = ElectronSettingsPaths;
    this.window = new BrowserWindow({
      ...this.windowConfiguration,
      show: false,
    });
    setWindowSize(this.window, settings.get(COMPACT));
  }



  load() {
    this.window.loadURL(this.path);
  }

  setAppListeners() {
    ipcMain.on(OPEN_WELCOME_WINDOW, () => this.createWelcomeWindow());
  }

  setWindowListeners() {
    const { MINIMIZE_TO_TRAY } = ElectronSettingsPaths;

    this.window.on('ready-to-show', () => {
      if (!this.window) throw new Error('"FocoMain" is not defined');
      this.window.show();
      this.window.focus();
    });

    this.window.on('minimize', e => {
      const minimizeToTray = settings.get(MINIMIZE_TO_TRAY);
      e.preventDefault();
      if (minimizeToTray) this.window.hide();
    });

    this.window.on('closed', () => {
      app.quit();
    });
  }

  setListeners() {
    this.setAppListeners();
    this.setWindowListeners();
  }
}

export default new FocoMain();
