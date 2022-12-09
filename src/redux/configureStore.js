import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts';
import { Jwttoken } from "./jwttoken";
import { Settings } from "./settings";
import { Auth } from "./auth";
import { Session } from "./session";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialAuth, InitialFeedback, InitialWidgetSettings } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      accounts: Accounts,
      jwttoken: Jwttoken,
      settings: Settings,
      auth: Auth,
      session: Session,
      ...createForms({
        feedback: InitialFeedback,
        widget: InitialWidgetSettings,
        login: InitialAuth,
        register: InitialAuth,
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
