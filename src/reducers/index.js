import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import DateReducer from './date';
import ItemReducer from './item'

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    date: DateReducer,
    itemList: ItemReducer
  });
}

export default createRootReducer;
