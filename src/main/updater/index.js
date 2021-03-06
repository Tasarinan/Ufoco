import { ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import settings from "../../utils/electron-settings.util";
import path from "path";
import {
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_NEEDS_UPDATE,
  CHECK_FOR_UPDATES,
} from "../../constants/ipc_channels";

import { openReleaseNotes } from "../../utils/release-notes.util";
import { isLinux } from "../../utils/platform.util";
import { isDev } from "../../utils/env.util";

class AppUpdater {
  constructor() {
    this.version = null;
    this.window = null;
    this.shouldShowUpdateAlert = false;
  }

  init = (win) => {
    if (isLinux()) return this;
    this.createLogger();
    this.window = win;
    autoUpdater.autoDownload = false;
    if (isDev) {
      autoUpdater.updateConfigPath = path.join(
        __dirname,
        "../../dev-app-update.yml"
      );
    }
    autoUpdater.checkForUpdates();
    this.setListeners();
    return this;
  };

  createLogger = () => {
    // eslint-disable-line class-methods-use-this
    const log = require("electron-log"); // eslint-disable-line global-require
    log.transports.file.level = "info";
    autoUpdater.logger = log;
  };

  checkingForUpdate = () => {
    this.notify(SEND_CHECKING_FOR_UPDATES);
  };

  updateNotAvailable = (info) => {
    const showReleaseNotes = settings.showReleaseNotes();
    this.version = info.version;
    settings.setVersion(info.version);

    // This flag prevents the alert to show up on the load everytime
    if (this.shouldShowUpdateAlert) this.notify(SEND_NEEDS_UPDATE, false);
    this.shouldShowUpdateAlert = true;

    if (showReleaseNotes) openReleaseNotes(info.version);
  };

  updateAvailable = (info) => {
    this.notify(SEND_NEEDS_UPDATE, info.version);
  };

  updateDownloaded = (info) => {
    this.version = info.version;
    settings.setVersion(info.version);
    autoUpdater.quitAndInstall();
  };

  updateError = () => {
    this.notify(
      SEND_ERROR,
      "Something went wrong while trying to look for updates."
    );
  };

  notify = (channel, message) => {
    this.window.webContents.send(channel, message);
  };

  setListeners() {
    autoUpdater.on("checking-for-update", this.checkingForUpdate);
    autoUpdater.on("update-not-available", this.updateNotAvailable);
    autoUpdater.on("update-available", this.updateAvailable);
    autoUpdater.on("update-downloaded", this.updateDownloaded);
    autoUpdater.on("error", this.updateError);

    ipcMain.on(ON_ACCEPT_UPDATE, () => autoUpdater.downloadUpdate());
    ipcMain.on(CHECK_FOR_UPDATES, () => autoUpdater.checkForUpdates());
  }
}

export default new AppUpdater();
