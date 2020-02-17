import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appReducer from "./app_reduces";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app: appReducer
  });
}

export default createRootReducer;
