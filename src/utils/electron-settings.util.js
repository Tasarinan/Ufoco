import db from "../repositories/lowdbPersistence";

if (!db.has("system")) {
  db.set("system", {
    version: "0.1",
    productName: "UFOCO",
    continuousMode: true,
    minimizeToTray: true,
    showTrayIcon: true,
    showTimerByTray: true,
    showReleaseNotes: true,
    theme: "light",
  });
}

export default {
  getVersion() {
    return db.get("system.version") || "0.1";
  },
  setVersion(value) {
    return db.set("system.version", value);
  },
  getTheme() {
    return db.get("system.theme");
  },
  setTheme(value) {
    return db.set("system.theme", value);
  },
  showTrayIcon() {
    return db.get("system.showTrayIcon") || true;
  },
  showTimerByTray() {
    return db.get("system.showTimerByTray") || true;
  },
  showReleaseNotes() {
    return db.get("system.showReleaseNotes") || true;
  },
  setShowReleaseNotes(value) {
    return db.set("system.showReleaseNotes", value);
  },
  minimizeToTray() {
    return db.get("system.minimizeToTray") || true;
  },
  getProductName() {
    return db.get("system.productName") || "";
  },
};
