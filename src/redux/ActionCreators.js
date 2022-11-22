import * as ActionTypes from './ActionTypes'
import { expressURL } from "../shared/expressURL";

export const postAccount = () => (dispatch) => {
  const query = window.location.search;
  const urlSearchParams = new URLSearchParams(query);

  const newAccount = {
    account_id: urlSearchParams.get('account_id'),
    nickname: urlSearchParams.get('nickname'),
    access_token: urlSearchParams.get('access_token'),
    expires_at: urlSearchParams.get('expires_at'),
  }

  return fetch(expressURL + 'accounts/', {
    method: 'POST',
    body: JSON.stringify(newAccount),
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
    .then((account) => {
      dispatch(addAccount(account));
      window.location.reload();
    })
    .catch((error) => alert(error));
};

export const deleteAccount = (account_id) => (dispatch) => {
  return fetch(`${expressURL}accounts/${account_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ account_id }),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    })
    .then((response) => response.json())
    .then(() => window.location.reload())
    .catch(() => alert('Error while deleting account. Try again!'));
};

export const fetchAccounts = () => (dispatch) => {
  dispatch(accountsLoading());

  return fetch(expressURL + 'accounts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
        if (response.ok) return response;
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((accounts) => dispatch(addAccounts(accounts)))
    .catch((error) => dispatch(accountsFailed(error.message)));
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


export const loginUser = (username, password) => (dispatch) =>  {
  const credentials = {
    username: username,
    password: password,
  }

  return fetch(expressURL + 'users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
        if (response.ok) return response;
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem('token', response.token);
      window.location.reload();
    })
    .catch((error) => { alert('You cannot login\nError: ' + error.message); });
};

export const signupUser = (username, password) => (dispatch) => {
  const credentials = {
    username: username,
    password: password,
  };

  return fetch(expressURL + 'users/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .catch((err) => { alert(`Error while creating account: ${err.message}`); });
};

export const tokenChecking = () => ({
  type: ActionTypes.JWTTOKEN_LOADING,
});

export const tokenFailed = (errMess) => ({
  type: ActionTypes.JWTTOKEN_FAILED,
  payload: errMess,
});

export const tokenValid = (token) => ({
  type: ActionTypes.JWTTOKEN_OK,
  payload: token,
});

export const checkJWTToken = () => (dispatch) =>  {
  dispatch(tokenChecking());

  return fetch(expressURL + 'users/checkJWTToken', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
    .then((response) => {
        if (response.ok) return response;
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      })
    .then((response) => response.json())
    .then((tkn) => dispatch(tokenValid(tkn)))
    .catch((error) => dispatch(tokenFailed(error.message)));
};

export const postFeedback = (feedback) => (dispatch) =>  {

  return fetch(expressURL + 'contact', {
    method: 'POST',
    body: JSON.stringify(feedback),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
        if (response.ok) return response;
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      })
    .then((response) => response.json())
    .catch((error) => { alert('Your feedback could not be posted\nError: ' + error.message); });
};

export const postSettings = (settings) => (dispatch) => {

  return fetch(expressURL + 'settings', {
    method: 'POST',
    body: JSON.stringify(settings),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    })
    .then((response) => response.json())
    .then(() => {
      window.history.pushState('', '', window.location.origin + '/session');
      window.location.reload();
    })
    .catch((error) => { alert('Your settings could not saved\nError: ' + error.message); });
}

export const fetchSettings = () => (dispatch) => {
  dispatch(settingsLoading());

  return fetch(expressURL + 'settings', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((settings) => dispatch(addSettings(settings)))
    .catch((error) => dispatch(settingsFailed(error.message)));
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

export const postUserStats = (stats) => (dispatch) => {
  return fetch(expressURL + 'session', {
    method: 'POST',
    body: JSON.stringify(stats),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    })
    .then((response) => response.json())
    .catch((error) => { alert('Your stats could not saved\nError: ' + error.message); });
}
