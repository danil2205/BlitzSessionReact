import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
