import * as ActionTypes from './ActionTypes';

export const Session = (state = {
  errMess: null,
  session: [],
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_SESSION:
      state.session.shift();
      return {...state, errMess: null, session: state.session.concat(action.payload)};
    case ActionTypes.SESSION_LOADING:
      return {...state, errMess: null, session: []};
    case ActionTypes.SESSION_FAILED:
      return {...state, errMess: action.payload, session: []};
    default:
      return state;
  }
};
