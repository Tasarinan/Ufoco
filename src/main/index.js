import path from "path";
import { app, screen, BrowserWindow, ipcMain } from "electron";

import { ElectronSettingsPaths } from "../constants/keypath_settings";

import settings from "../utils/electron-settings.util";
import { isMacOS, isLinux } from "../utils/platform.util";
import { setWindowSize } from "../utils/windows.util";

import BiguMenu from "./menu";
import BiguTray from "./tray";
// import BiguUpdater from './updater';
import { ON_CHANGE_COMPACT_MODE } from "../constants/ipc_channels";

class BiguMain {
  constructor() {
    this.menu = null;
    this.path = null;
    this.tray = null;
    this.updater = null;
    this.window = null;
  }

  windowConfiguration = {
    frame: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    resizeable: false,
    fullscreenable: false,
    alwaysOnTop: true,
    icon:
      isMacOS() || isLinux()
        ? path.join(__dirname, "../assets/icons/mac/64x64.png")
        : path.join(__dirname, "../assets/icons/windows/64x64.png")
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
    this.menu = BiguMenu.init(this.window);
  }

  createTray() {
    this.tray = BiguTray.init(this.window);
  }

  createUpdater() {
    // this.updater = BiguUpdater.init(this.window);
  }

  createMainWindow() {
    const { COMPACT } = ElectronSettingsPaths;
    const mainScreen = screen.getPrimaryDisplay();
    this.window = new BrowserWindow({
      ...this.windowConfiguration,
      x: mainScreen.workArea.width - 300 - 20,
      y: 40,
      show: false
    });
    setWindowSize(this.window, settings.get(COMPACT));
  }

  load() {
    this.window.loadURL(this.path);
  }

  setAppListeners() {
    ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
      setWindowSize(this.window, compact)
    );
  }

  setWindowListeners() {
    const { MINIMIZE_TO_TRAY } = ElectronSettingsPaths;

    this.window.on("ready-to-show", () => {
      if (!this.window) throw new Error('"Main Window" is not defined');
      this.window.show();
      this.window.focus();
    });

    this.window.on("minimize", e => {
      const minimizeToTray = settings.get(MINIMIZE_TO_TRAY);
      e.preventDefault();
      if (minimizeToTray) this.window.hide();
    });

    this.window.on("closed", () => {
      app.quit();
    });
  }

  setListeners() {
    this.setAppListeners();
    this.setWindowListeners();
  }
}

export default new BiguMain();
