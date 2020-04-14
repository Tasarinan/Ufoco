import { remote, shell } from "electron";
import settings from "./electron-settings.util";

var repo = require("../../package.json");

export const openNewWindow = (link) => shell.openExternal(link);

export const setWindowSize = (win, compact) => {
  const WIDTH = 330;
  const HEIGHT = 900;
  const COMPACT_WIDTH = 330;
  const COMPACT_HEIGHT = 200;

  if (compact) {
    win.setResizable(false);
    win.setMaximizable(false);
    win.setAlwaysOnTop(true);
    win.setMinimumSize(COMPACT_WIDTH, COMPACT_HEIGHT);
    win.setSize(COMPACT_WIDTH, COMPACT_HEIGHT, true);
    settings.setCompact(true);
  } else {
    win.setResizable(true);
    win.setMaximizable(true);
    win.setAlwaysOnTop(false);
    win.setMinimumSize(WIDTH, HEIGHT);
    win.setSize(WIDTH, HEIGHT, true);
    settings.setCompact(false);
  }
};

export const showIssuesWindow = () => shell.openExternal(repo.bugs.url);

export const showWindow = () => remote.getCurrentWindow().show();
