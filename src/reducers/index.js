import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appReducer from "./app_reducer";
import authReducer from "./auth_reducer";
import fileReducer from "./file_reducer";
import buflReducer from "./bufl_reduce";
import journalReducer from "./editor.reduce";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    file: fileReducer,
    bufl: buflReducer,
    editor: journalReducer,
  });
}

export default createRootReducer;
