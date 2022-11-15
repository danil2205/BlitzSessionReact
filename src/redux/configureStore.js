import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import { Jwttoken } from "./jwttoken";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
      jwttoken: Jwttoken,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
