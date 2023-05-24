import * as ActionTypes from './ActionTypes.js';

export const ServerStats = (state = {
  errMess: null,
  serverStats: {},
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_SERVER_STATISTIC:
    return { ...state, errMess: null, serverStats: action.payload[0] };
  case ActionTypes.SERVER_STATISTIC_LOADING:
    return { ...state, errMess: null, serverStats: {} };
  case ActionTypes.SERVER_STATISTIC_FAILED:
    return { ...state, errMess: action.payload, serverStats: {} };
  default:
    return state;
  }
};
