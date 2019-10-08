import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';


const configureStore = (rootReducer,initialState,middleware) => {

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Create Store
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(rootReducer) // eslint-disable-line global-require
    );
  }

  return store;
};

export default configureStore;
