import db from "./lowdbPersistence";

if (!db.has("prefs")) {
  db.set("prefs", {
    account: "",
    hashPassword: "",
    language: "en",
    filePath: "",
    encryptedMode: false,
  });
}

const keyBindings = {
  acceptItemChange: {
    mac: ["meta", "enter"],
    win: ["ctrl", "enter"],
  },
  addNewBoard: {
    win: ["ctrl", "shift", "n"],
    mac: ["meta", "shift", "n"],
  },
  cancelItemChange: {
    mac: ["esc"],
    win: ["esc"],
  },
  filterItemsFocus: {
    mac: ["meta", "f"],
    win: ["ctrl", "f"],
  },
  newItemFocus: {
    mac: ["meta", "n"],
    win: ["ctrl", "n"],
  },
  nextTab: {
    win: ["ctrl", "shift", "}"],
    mac: ["meta", "shift", "]"],
  },
  prevTab: {
    win: ["ctrl", "shift", "{"],
    mac: ["meta", "shift", "["],
  },
  showEmoji: {
    readonly: true,
    mac: ["meta", "e"],
    win: ["ctrl", "e"],
  },
  showFindItem: {
    mac: ["meta", "shift", "f"],
    win: ["ctrl", "shift", "f"],
  },
  showKeymap: {
    win: ["ctrl", "k"],
    mac: ["meta", "k"],
  },
};

export default {
  isLoading() {
    if (db.get("prefs.hashPassword") === "") {
      return false;
    }
    return true;
  },

  getAccount() {
    return db.get("prefs.account");
  },
  setAccount(value) {
    return db.set("prefs.account", value);
  },
  getHashPassword() {
    return db.get("prefs.hashPassword");
  },
  setHashPassword(value) {
    return db.set("prefs.hashPassword", value);
  },

  getPrefs() {
    return db.get("prefs").cloneDeep().value();
  },
  updatePrefs(updateProp) {
    return db.get("prefs").assign(updateProp).write();
  },
  hasLanguageProperty() {
    return db.has("prefs.language").value();
  },

  loadDirPref() {
    return db.get("prefs.filePath");
  },
  saveDirPref(value) {
    return db.set("prefs.filePath", value);
  },

  getEncryptedMode() {
    return db.get("prefs.encryptedMode");
  },
  setEncryptedMode(value) {
    return db.set("prefs.encryptedMode", value);
  },

  addKeyBinding(keyId, keyCombinations) {
    return db.get(`prefs.keyBindings`).set(keyId, keyCombinations).write();
  },
  getKeyBindings() {
    return db.get("prefs.keyBindings").cloneDeep().value();
  },
  hasKeyBindingsProperty() {
    return db.has("prefs.keyBindings").value();
  },

  setupKeyBindings() {
    this.updatePrefs({ keyBindings: keyBindings });
  },

  updateKeyBinding(keyId, combination, isMac) {
    if (isMac) {
      return db
        .get(`prefs.keyBindings.${keyId}`)
        .set("mac", combination)
        .write();
    } else {
      return db
        .get(`prefs.keyBindings.${keyId}`)
        .set("win", combination)
        .write();
    }
  },
};
