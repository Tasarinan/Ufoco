import { remote, shell } from "electron";
import settings from "electron-settings";

var repo = require("../../package.json");

export const openNewWindow = link => shell.openExternal(link);

export const setWindowSize = (win, compact) => {
  const WIDTH = 400;
  const HEIGHT = 800;
  const COMPACT_WIDTH = 400;
  const COMPACT_HEIGHT = 200;

  if (compact) {
    win.setResizable(false);
    win.setMaximizable(false);
    win.setAlwaysOnTop(true);
    win.setMinimumSize(COMPACT_WIDTH, COMPACT_HEIGHT);
    win.setSize(COMPACT_WIDTH, COMPACT_HEIGHT, true);
    settings.set("system.compact", true);
  } else {
    win.setResizable(true);
    win.setMaximizable(true);
    win.setAlwaysOnTop(false);
    win.setMinimumSize(WIDTH, HEIGHT);
    win.setSize(WIDTH, HEIGHT, true);
    settings.set("system.compact", false);
  }
};

export const showIssuesWindow = () => shell.openExternal(repo.bugs.url);

export const showWindow = () => remote.getCurrentWindow().show();
