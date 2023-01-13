import * as ActionTypes from './ActionTypes'
import { expressURL } from "../shared/expressURL";

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
    actions: [addAccount],
  });
};

export const deleteAccount = (account_id) => (dispatch) => {
  fetchData({
    link: `accounts/${account_id}`,
    method: 'DELETE',
    data: { account_id },
    dispatch,
    actions: [delAccount],
  });
};

export const fetchAccounts = () => (dispatch) => {
  dispatch(accountsLoading());

  fetchData({
    link: 'accounts',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [addAccounts, accountsFailed],
  });
};

export const accountsLoading = () => ({
  type: ActionTypes.ACCOUNTS_LOADING,
});

export const accountsFailed = (errMess) => ({
  type: ActionTypes.ACCOUNTS_FAILED,
  payload: errMess,
});

export const addAccounts = (accounts) => ({
  type: ActionTypes.ADD_ACCOUNTS,
  payload: accounts,
});

export const addAccount = (accounts) => ({
  type: ActionTypes.ADD_ACCOUNT,
  payload: accounts,
});

export const delAccount = (accounts) => ({
  type: ActionTypes.DEL_ACCOUNT,
  payload: accounts,
});

export const requestLogin = () => ({
  type: ActionTypes.LOGIN_REQUEST
});

export const receiveLogin = (user) => {
  localStorage.setItem('token', user.token);
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user,
  };
};

export const loginError = (message) => ({
  type: ActionTypes.LOGIN_FAILURE,
  message,
});

export const loginUser = (credentials) => (dispatch) => {
  dispatch(requestLogin());

  fetchData({
    link: 'users/login',
    method: 'POST',
    data: credentials,
    dispatch,
    actions: [receiveLogin, loginError],
  });
};

export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(receiveLogout());
};

export const requestRegister = () => ({
  type: ActionTypes.REGISTER_REQUEST
});

export const receiveRegister = (user) => {  // maybe temporary?
  localStorage.setItem('token', user.token);
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    user,
  };
};

export const registerError = (message) => ({
  type: ActionTypes.REGISTER_FAILURE,
  message,
});

export const signupUser = (credentials) => (dispatch) => {
  dispatch(requestRegister());

  fetchData({
    link: 'users/signup',
    method: 'POST',
    data: credentials,
    dispatch,
    actions: [receiveRegister, registerError],
  });

};

export const tokenChecking = () => ({
  type: ActionTypes.JWTTOKEN_LOADING,
});

export const tokenFailed = (errMess) => { // MAYBE TEMPORARY TOO
  localStorage.removeItem('token');
  return {
    type: ActionTypes.JWTTOKEN_FAILED,
    payload: errMess,
  };
};

export const tokenValid = (token) => ({
  type: ActionTypes.JWTTOKEN_OK,
  payload: token,
});

export const checkJWTToken = () => (dispatch) =>  {
  dispatch(tokenChecking());

  fetchData({
    link: 'users/checkJWTToken',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [tokenValid, tokenFailed],
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

export const addSetting = (settings) => ({
  type: ActionTypes.ADD_SETTING,
  payload: settings,
});

export const postSettings = (settings) => (dispatch) => {
  fetchData({
    link: 'settings',
    method: 'POST',
    data: settings,
    dispatch,
    actions: [addSetting],
  });
}

export const fetchSettings = () => (dispatch) => {
  dispatch(settingsLoading());

  fetchData({
    link: 'settings',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [addSettings, settingsFailed],
  });
};

export const settingsLoading = () => ({
  type: ActionTypes.SETTINGS_LOADING,
});

export const settingsFailed = (errMess) => ({
  type: ActionTypes.SETTINGS_FAILED,
  payload: errMess,
});

export const addSettings = (settings) => ({
  type: ActionTypes.ADD_SETTINGS,
  payload: settings,
});

export const sessionLoading = () => ({
  type: ActionTypes.SESSION_LOADING,
});

export const sessionFailed = (errMess) => ({
  type: ActionTypes.SESSION_FAILED,
  payload: errMess,
});

export const addSession = (settings) => ({
  type: ActionTypes.ADD_SESSION,
  payload: settings,
});

export const fetchSessionData = () => (dispatch) => {
  dispatch(sessionLoading());

  fetchData({
    link: 'session',
    method: 'GET',
    data: undefined,
    dispatch,
    actions: [addSession, sessionFailed],
  });
};

export const postSessionData = (data) => (dispatch) => {
  fetchData({
    link: 'session',
    method: 'POST',
    data: data,
    dispatch,
    actions: [addSession],
  });
}
