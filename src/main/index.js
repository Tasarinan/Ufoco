import path from "path";
import { app, screen, BrowserWindow, ipcMain } from "electron";

import settings from "../utils/electron-settings.util";
import { isMacOS, isLinux } from "../utils/platform.util";
import { setWindowSize } from "../utils/windows.util";
import { ViewSize } from "../constants/enums";

import MenuBuilder from "./menu";
import TrayBuilder from "./tray";
import AppUpdater from "./updater";
import { ON_CHANGE_WINDOW_SIZE } from "../constants/ipc_channels";

class EdgeMain {
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
        ? path.join(__dirname, "../assets/icons/64.png")
        : path.join(__dirname, "../assets/icons/64.png"),
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
    this.menu = MenuBuilder.init(this.window);
  }

  createTray() {
    this.tray = TrayBuilder.init(this.window);
  }

  createUpdater() {
    // this.updater = AppUpdater.init(this.window);
  }

  createMainWindow() {
    const mainScreen = screen.getPrimaryDisplay();
    this.window = new BrowserWindow({
      ...this.windowConfiguration,
      x: mainScreen.workArea.width - 500 - 20,
      y: 50,
      show: false,
    });
    setWindowSize(this.window, ViewSize.NORMAL);
  }

  load() {
    this.window.loadURL(this.path);
  }

  setAppListeners() {
    ipcMain.on(ON_CHANGE_WINDOW_SIZE, (e, size) =>
      setWindowSize(this.window, size)
    );
  }

  setWindowListeners() {
    this.window.on("ready-to-show", () => {
      if (!this.window) throw new Error('"Main Window" is not defined');
      this.window.show();
      this.window.focus();
    });

    this.window.on("minimize", (e) => {
      const minimizeToTray = settings.minimizeToTray();
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

export default new EdgeMain();
