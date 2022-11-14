import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import thunk from "redux-thunk";
import logger from "redux-logger";
import {createForms} from "react-redux-form";
import { InitialLogin } from "./InitialLogin";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
      // ...createForms({
      //   account: InitialLogin
      // })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
