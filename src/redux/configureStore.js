import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import { Jwttoken } from "./jwttoken";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback, InitialWidgetSettings } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
      jwttoken: Jwttoken,
      ...createForms({
        feedback: InitialFeedback,
        widget: InitialWidgetSettings,
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
