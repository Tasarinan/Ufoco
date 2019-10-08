import thunk from 'redux-thunk'
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

import createRootReducer from '../reducers'
import initialState from './initialState';

const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const middleware = [thunk,router];
const store = configureStore(rootReducer,initialState,middleware);

export default  {store, history};
