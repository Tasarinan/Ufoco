import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './app_reducer';
import authReducer from './auth_reducer';
import fileReducer from './file_reducer';
import itemReducer from './item_reduce';
import mdeditorRducer from './mdeditor_reduce';
import taskReducer from './task_reduce';

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    file: fileReducer,
    item: itemReducer,
    editor: mdeditorRducer,
    task: taskReducer,
  });
}

export default createRootReducer;
