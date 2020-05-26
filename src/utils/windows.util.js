import { remote, shell } from "electron";
import settings from "./electron-settings.util";

var repo = require("../../package.json");
import { ViewSize } from "../constants/enums";
export const openNewWindow = (link) => shell.openExternal(link);

export const setWindowSize = (win, size) => {
  const MINI_WIDTH = 330;
  const MINI_HEIGHT = 900;
  const COMPACT_WIDTH = 330;
  const COMPACT_HEIGHT = 200;
  const WIDTH = 1100;
  const HEIGHT = 900;

  switch (size) {
    case ViewSize.COMPACT: {
      win.setResizable(false);
      win.setMaximizable(false);
      win.setAlwaysOnTop(true);
      win.setMinimumSize(COMPACT_WIDTH, COMPACT_HEIGHT);
      win.setSize(COMPACT_WIDTH, COMPACT_HEIGHT, true);
      settings.setCompact(true);
      break;
    }
    case ViewSize.MINI: {
      win.setResizable(true);
      win.setMaximizable(true);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(MINI_WIDTH, MINI_HEIGHT);
      win.setSize(MINI_WIDTH, MINI_HEIGHT, true);
      settings.setCompact(false);
      break;
    }
    case ViewSize.NORMAL: {
      win.setResizable(true);
      win.setMaximizable(true);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(WIDTH, HEIGHT);
      win.setSize(WIDTH, HEIGHT, true);
      win.center();
      settings.setCompact(false);

      break;
    }
    default: {
      win.setResizable(true);
      win.setMaximizable(true);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(WIDTH, HEIGHT);
      win.setSize(WIDTH, HEIGHT, true);
      settings.setCompact(false);
    }
  }
};

export const showIssuesWindow = () => shell.openExternal(repo.bugs.url);

export const showWindow = () => remote.getCurrentWindow().show();
