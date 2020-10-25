import { remote, shell } from "electron";

var repo = require("../../package.json");
import { ScreenSize } from "../constants/enums";
export const openNewWindow = (link) => shell.openExternal(link);

export const setWindowSize = (win, size) => {
  const EXPAND_WIDTH = 330;
  const EXPAND_HEIGHT = 900;
  const NAV_WIDTH = 330;
  const NAV_HEIGHT = 200;
  const LOCK_WIDTH = 330;
  const LOCK_HEIGHT = 500;
  const WIDTH = 1100;
  const HEIGHT = 900;

  switch (size) {
    case ScreenSize.NAV: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(NAV_WIDTH, NAV_HEIGHT);
      win.setSize(NAV_WIDTH, NAV_HEIGHT, true);
      break;
    }
    case ScreenSize.EXPAND: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(EXPAND_WIDTH, EXPAND_HEIGHT);
      win.setSize(EXPAND_WIDTH, EXPAND_HEIGHT, true);
      break;
    }
    default: {
      win.setResizable(true);
      win.setMaximizable(true);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(WIDTH, HEIGHT);
      win.setSize(WIDTH, HEIGHT, true);
      win.center();
    }
  }
};

export const showIssuesWindow = () => shell.openExternal(repo.bugs.url);

export const showWindow = () => remote.getCurrentWindow().show();
