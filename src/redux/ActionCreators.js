import * as ActionTypes from './ActionTypes'
import {expressURL} from "../shared/expressURL";

export const postAccount = (access_token, nickname, account_id, expires_at) => (dispatch) => {
  const newAccount = {
    access_token: access_token,
    nickname: nickname,
    account_id: account_id,
    expires_at: expires_at,
  }

  return fetch(expressURL + 'accounts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'body': JSON.stringify(newAccount),
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin'
  })
    .then((response) => {
        if (response.ok) return response;
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      },
      (error) => {
        throw new Error(error.message);
      })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      alert(`Your Account: ${JSON.stringify(response)}`);
    })
    .catch((error) => {
      console.log('Post account ', error.message);
      alert('Your account could not be added\nError: ' + error.message);
    });
};

export const fetchAccounts = () => (dispatch) => {
  dispatch(accountsLoading(true));

  return fetch(expressURL + 'accounts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: 'same-origin'
  })
    .then((response) => {
        if (response.ok) return response;
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      },
      (error) => {
        throw new Error(error.message);
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

export const postUser = (username, password) => (dispatch) =>  {
  const newAccount = {
    username: username,
    password: password,
  }

  return fetch(expressURL + 'users/login', {
    method: 'POST',
    body: JSON.stringify(newAccount),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then((response) => {
        if (response.ok) return response;
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      },
      (error) => {
        throw new Error(error.message);
      })
    .then((response) => response.json() )
    .then((response) => {
      localStorage.setItem('token', response.token);
      dispatch(addAccount(response))
    })
    .catch((error) => {
      console.log('Post Account ', error.message);
      alert('Your account cannot be added\nError: ' + error.message);
    });
};

