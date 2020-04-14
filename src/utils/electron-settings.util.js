import db from "../repositories/lowdbPersistence";

if (!db.has("system")) {
  db.set("system", {
    version: "0.1",
    productName: "UFOCO",
    compact: true,
    continuousMode: true,
    minimizeToTray: true,
    showTrayIcon: true,
    showTimerByTray: true,
    showReleaseNotes: true,
  });
}

export default {
  getVersion() {
    return db.get("system.version") || "0.1";
  },
  setVersion(value) {
    return db.set("system.version", value);
  },
  getCompact() {
    return db.get("system.compact");
  },
  setCompact(value) {
    return db.set("system.compact", value);
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
