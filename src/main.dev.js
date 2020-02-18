/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 */
import path from "path";
import url from "url";
import { app } from "electron";
import settings from "./utils/electron-settings.util";
import { isDev, isProd } from "./utils/env.util";
import { installExtensions } from "./utils/install-extensions.util";

import BiguMain from "./main";

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

if (isProd()) {
  const sourceMapSupport = require("source-map-support"); // eslint-disable-line global-require
  sourceMapSupport.install();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
let Main = null;
app.on("activate", (e, hasVisibleWindows) => {
  if (!hasVisibleWindows) Main.show();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
  ) {
    //TODO await installExtensions();
  }
  // DANGER: Use wisely. This will delete their settings in local
  settings.flush("DONE_FLUSH", { chart: false });
  // and load the index.html of the app.
  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:3100",
      pathname: "index.html",
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true
    });
  }
  Main = BiguMain.init(indexPath).window;
});
