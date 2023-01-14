import * as ActionTypes from './ActionTypes.js'
import { expressURL } from '../shared/expressURL.js';

const makeActionCreator = (type, argName = 'payload') => (arg) => {
  const action = { type };
  if (arg) action[argName] = arg;
  return action;
};

const fetchData = ({ link, method, data, dispatch, actions }) => {
  const [ addData, errData ] = actions;

  return fetch(expressURL + link, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    })
    .then((response) => response.json())
    .then((data) => {
      if (addData) dispatch(addData(data));
    })
    .catch((error) => {
      if (errData) return dispatch(errData(error.message));
      alert(error.message);
    });
};

export const postAccount = () => (dispatch) => {
  const query = window.location.search;
  const urlSearchParams = new URLSearchParams(query);

  const newAccount = {
    account_id: urlSearchParams.get('account_id'),
    nickname: urlSearchParams.get('nickname'),
    access_token: urlSearchParams.get('access_token'),
    expires_at: urlSearchParams.get('expires_at'),
  }

  fetchData({
    link: 'accounts',
    method: 'POST',
    data: newAccount,
    dispatch,
    actions: [makeActionCreator(ActionTypes.ADD_ACCOUNT)],
  });
};

export const deleteAccount = (account_id) => (dispatch) => {
  fetchData({
    link: `accounts/${account_id}`,
    method: 'DELETE',
    data: { account_id },
    dispatch,
    actions: [makeActionCreator(ActionTypes.DEL_ACCOUNT)],
  });
};

export const fetchAccounts = () => (dispatch) => {
  dispatch(makeActionCreator(ActionTypes.ACCOUNTS_LOADING)());
  fetchData({
    link: 'accounts',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [
      makeActionCreator(ActionTypes.ADD_ACCOUNTS),
      makeActionCreator(ActionTypes.ACCOUNTS_FAILED),
    ],
  });
};

export const receiveLogin = (user) => { // temporary
  localStorage.setItem('token', user.token);
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user,
  };
};

export const loginUser = (credentials) => (dispatch) => {
  dispatch(makeActionCreator(ActionTypes.LOGIN_REQUEST)());
  fetchData({
    link: 'users/login',
    method: 'POST',
    data: credentials,
    dispatch,
    actions: [
      receiveLogin,
      makeActionCreator(ActionTypes.LOGIN_FAILURE, 'message'),
    ],
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(makeActionCreator(ActionTypes.LOGOUT_SUCCESS)());
};

export const receiveRegister = (user) => {  // maybe temporary?
  localStorage.setItem('token', user.token);
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    user,
  };
};

export const signupUser = (credentials) => (dispatch) => {
  dispatch(makeActionCreator(ActionTypes.REGISTER_REQUEST)());
  fetchData({
    link: 'users/signup',
    method: 'POST',
    data: credentials,
    dispatch,
    actions: [
      receiveRegister,
      makeActionCreator(ActionTypes.REGISTER_FAILURE, 'message'),
    ],
  });
};

export const tokenFailed = (errMess) => { // MAYBE TEMPORARY TOO
  localStorage.removeItem('token');
  return {
    type: ActionTypes.JWTTOKEN_FAILED,
    payload: errMess,
  };
};

export const checkJWTToken = () => (dispatch) =>  {
  dispatch(makeActionCreator(ActionTypes.JWTTOKEN_LOADING)());
  fetchData({
    link: 'users/checkJWTToken',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [
      makeActionCreator(ActionTypes.JWTTOKEN_OK),
      tokenFailed,
    ],
  });
};

export const postFeedback = (feedback) => (dispatch) =>  {
  fetchData({
    link: 'contact',
    method: 'POST',
    data: feedback,
    dispatch,
    actions: [],
  });
};

export const postSettings = (settings) => (dispatch) => {
  fetchData({
    link: 'settings',
    method: 'POST',
    data: settings,
    dispatch,
    actions: [makeActionCreator(ActionTypes.ADD_SETTING)],
  });
};

export const fetchSettings = () => (dispatch) => {
  dispatch(makeActionCreator(ActionTypes.SETTINGS_LOADING)());

  fetchData({
    link: 'settings',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [
      makeActionCreator(ActionTypes.ADD_SETTINGS),
      makeActionCreator(ActionTypes.SETTINGS_FAILED),
    ],
  });
};

export const fetchSessionData = () => (dispatch) => {
  dispatch(makeActionCreator(ActionTypes.SESSION_LOADING)());

  fetchData({
    link: 'session',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [
      makeActionCreator(ActionTypes.ADD_SESSION),
      makeActionCreator(ActionTypes.SESSION_FAILED),
    ],
  });
};

export const postSessionData = (data) => (dispatch) => {
  fetchData({
    link: 'session',
    method: 'POST',
    data: data,
    dispatch,
    actions: [makeActionCreator(ActionTypes.ADD_SESSION)],
  });
};
