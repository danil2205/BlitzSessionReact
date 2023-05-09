import * as ActionTypes from './ActionTypes.js';

export const TanksStats = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_PLAYER_STATS:
    return { ...action.payload };
  default:
    return state;
  }
};
