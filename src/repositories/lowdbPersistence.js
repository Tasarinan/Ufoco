import Datastore from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import fs from "fs-extra";
import { remote, app } from "electron";
import LodashId from "lodash-id";

const APP = process.type === "renderer" ? remote.app : app;
const DATA_PATH = APP.getPath("userData");
if (process.type !== "renderer") {
  if (!fs.pathExistsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
  }
}
class DB {
  constructor() {
    const dataAdapter = new FileSync(path.join(DATA_PATH, "/data.json"));
    this.db = Datastore(dataAdapter);
    this.db._.mixin(LodashId);
  }
  read() {
    return this.db.read();
  }
  get(key = "") {
    return this.read().get(key).value();
  }
  set(key, value) {
    return this.read().set(key, value).write();
  }
  has(key) {
    return this.read().has(key).value();
  }
  insert(key, value) {
    return this.read().get(key).insert(value).write();
  }
  unset(key, value) {
    return this.read().get(key).unset(value).value();
  }
  getById(key, id) {
    return this.read().get(key).getById(id).value();
  }
  removeById(key, id) {
    return this.read().get(key).removeById(id).write();
  }
}

export default new DB();
