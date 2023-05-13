import * as ActionTypes from './ActionTypes.js';

export const TankStats = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_TANK_STATS:
    return { ...action.payload };
  default:
    return state;
  }
};

export const AccountStats = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_ACCOUNT_STATS:
    return { ...action.payload };
  default:
    return state;
  }
};
