import * as ActionTypes from './ActionTypes'
import { expressURL } from "../shared/expressURL";

export const postAccount = () => (dispatch) => {
  if (!window.location.search) return;
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
      window.history.pushState('', '', window.location.origin + '/accounts');
      dispatch(addAccount(account));
      window.location.reload();
    })
    .catch((error) => {
      window.history.pushState('', '', window.location.origin + '/accounts');
      alert('Error: You have already added this account!');
    });
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
  dispatch(accountsLoading(true));

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
    .then(() => { window.location.reload(); })
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
  dispatch(tokenChecking(true));

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
