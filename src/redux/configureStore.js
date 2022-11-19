import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import { Jwttoken } from "./jwttoken";
import { Settings } from "./settings";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback, InitialWidgetSettings } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
      jwttoken: Jwttoken,
      settings: Settings,
      ...createForms({
        feedback: InitialFeedback,
        widget: InitialWidgetSettings,
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
