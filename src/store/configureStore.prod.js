import { createStore, applyMiddleware } from 'redux';

function configureStore(rootReducer,initialState,middleware) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}

export default configureStore;
