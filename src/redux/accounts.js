import * as ActionTypes from './ActionTypes.js';

export const Accounts = (state = {
  errMess: null,
  accounts: [],
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_ACCOUNTS:
    return { ...state, isLoading: false, errMess: null, accounts: action.payload };
  case ActionTypes.ADD_ACCOUNT:
  case ActionTypes.DEL_ACCOUNT:
    return { ...state, accounts: state.accounts.splice(0, 1).concat(action.payload) };
  case ActionTypes.ACCOUNTS_LOADING:
    return { ...state, isLoading: true, errMess: null, accounts: [] };
  case ActionTypes.ACCOUNTS_FAILED:
    return { ...state, isLoading: false, errMess: action.payload, accounts: [] };
  default:
    return state;
  }
};
