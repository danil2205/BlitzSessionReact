import * as ActionTypes from './ActionTypes.js';

export const Jwttoken = (state = {
  errMess: null,
  jwttoken: [],
}, action) => {
  switch (action.type) {
  case ActionTypes.JWTTOKEN_OK:
    return { ...state, isLoading: false, errMess: null, jwttoken: action.payload };
  case ActionTypes.JWTTOKEN_LOADING:
    return { ...state, isLoading: true, errMess: null, jwttoken: [] };
  case ActionTypes.JWTTOKEN_FAILED:
    return { ...state, isLoading: false, errMess: action.payload, jwttoken: [] };
  default:
    return state;
  }
};
