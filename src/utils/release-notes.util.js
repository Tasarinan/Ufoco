import { shell } from "electron";
import settings from "./electron-settings.util";

export const openReleaseNotes = (version) => {
  shell.openExternal(
    `https://github.com/tasarinan/ufoco/releases/tag/v${version}`
  );
  settings.setShowReleaseNotes(false);
};
