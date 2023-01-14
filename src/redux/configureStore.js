import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Accounts } from './accounts.js';
import { Jwttoken } from './jwttoken.js';
import { Settings } from './settings.js';
import { Auth } from './auth.js';
import { Session } from './session.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialAuth, InitialFeedback, InitialWidgetSettings } from './forms.js';

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
