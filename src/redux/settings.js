import * as ActionTypes from './ActionTypes'

export const Settings = (state = {
  errMess: null,
  settings: [],
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_SETTINGS:
      return {...state, isLoading: false, errMess: null, settings: action.payload};
    case ActionTypes.SETTINGS_LOADING:
      return {...state, isLoading: true, errMess: null, settings: []};
    case ActionTypes.SETTINGS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, settings: []};
    default:
      return state;
  }
};
