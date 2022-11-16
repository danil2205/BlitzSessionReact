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
    credentials: 'same-origin'
  })
    .then((response) => {
        if (response.ok) return response;
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }, (error) => { throw new Error(error.message); })
    .then((response) => response.json())
    .then((account) => {
      window.history.pushState('', '', window.location.origin + '/accounts');
      dispatch(addAccount(account));
      window.location.reload();
    })
    .catch((error) => {
      window.history.pushState('', '', window.location.origin + '/accounts');
      console.log('Post account ', error.message);
      alert('Error: You have already added this account!');
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
      localStorage.setItem('token', response.token);
      window.location.reload();
    })
    .catch((error) => {
      console.log('Error Login: ', error.message);
      alert('You cannot login\nError: ' + error.message);
    });
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
    .then((response) => { window.location.reload(); })
    .catch((err) => { console.log(`Error SignUp: ${err.message}`) });
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
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      },
      (error) => {
        throw new Error(error.message);
      })
    .then((response) => response.json())
    .then((tkn) => dispatch(tokenValid(tkn)))
    .catch((error) => dispatch(tokenFailed(error.message)));
};
