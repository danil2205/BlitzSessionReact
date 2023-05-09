import * as ActionTypes from './ActionTypes.js';

export const Tanks = (state = {
  errMess: null,
  tanks: [],
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_LIST_TANKS:
    return { ...state, isLoading: false, errMess: null, tanks: action.payload };
  case ActionTypes.LIST_TANKS_LOADING:
    return { ...state, isLoading: true, errMess: null, tanks: [] };
  case ActionTypes.LIST_TANKS_FAILED:
    return { ...state, isLoading: false, errMess: action.payload, tanks: [] };
  default:
    return state;
  }
};
