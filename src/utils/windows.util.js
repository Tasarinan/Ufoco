import { remote, shell } from "electron";
import settings from "./electron-settings.util";

var repo = require("../../package.json");
import { ViewSize } from "../constants/enums";
export const openNewWindow = (link) => shell.openExternal(link);

export const setWindowSize = (win, size) => {
  const AGENDA_WIDTH = 330;
  const AGENDA_HEIGHT = 900;
  const GAUGE_WIDTH = 330;
  const GAUGE_HEIGHT = 200;
  const LOCK_WIDTH = 330;
  const LOCK_HEIGHT = 500;
  const WIDTH = 1100;
  const HEIGHT = 900;

  switch (size) {
    case ViewSize.GAUGE: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(GAUGE_WIDTH, GAUGE_HEIGHT);
      win.setSize(GAUGE_WIDTH, GAUGE_HEIGHT, true);
      settings.setCompact(true);
      break;
    }
    case ViewSize.AGENDA: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(AGENDA_WIDTH, AGENDA_HEIGHT);
      win.setSize(AGENDA_WIDTH, AGENDA_HEIGHT, true);
      settings.setCompact(false);
      break;
    }
    case ViewSize.LOCK: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(LOCK_WIDTH, LOCK_HEIGHT);
      win.setSize(LOCK_WIDTH, LOCK_HEIGHT, true);
      settings.setCompact(true);
      break;
    }
    case ViewSize.MAXIMIZE: {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
      settings.setCompact(false);
      break;
    }
    case ViewSize.FULLSCREEN: {
      win.setFullScreen(!win.isFullScreen());
      settings.setCompact(false);
      break;
    }
    default: {
      win.setResizable(true);
      win.setMaximizable(true);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(WIDTH, HEIGHT);
      win.setSize(WIDTH, HEIGHT, true);
      win.center();
      settings.setCompact(false);
    }
  }
};

export const showIssuesWindow = () => shell.openExternal(repo.bugs.url);

export const showWindow = () => remote.getCurrentWindow().show();
