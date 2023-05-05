import * as ActionTypes from './ActionTypes.js';

export const TanksStats = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.SET_TANKS_STATS_DATA:
    return { ...action.payload };
  default:
    return state;
  }
};
