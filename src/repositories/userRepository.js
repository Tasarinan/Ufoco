import db from "./lowdbPersistence";

if (!db.has("account")) {
  db.set("account", {
    email: "",
    dataPath: "",
    encryptedMode: false,
  });
}

export default {
  isInitialized() {
    if (db.get("account.email") === "") {
      return false;
    }
    return true;
  },

  getUserEmail() {
    return db.get("account.email");
  },
  setUserEmail(value) {
    return db.set("account.email", value);
  },
  getPassword() {
    return db.get("bujo.password");
  },
  setPassword(value) {
    return db.set("bujo.password", value);
  },

  getDatapath() {
    return db.get("account.dataPath");
  },
  setDatapath(value) {
    return db.set("account.dataPath", value);
  },

  getEncryptedMode() {
    return db.get("account.encryptedMode");
  },
  setEncryptedMode(value) {
    return db.set("account.encryptedMode", value);
  },
};
