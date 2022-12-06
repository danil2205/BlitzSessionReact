import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errMess: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: '',
        user: action.user,
      };
    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };
    default:
      return state
  }
};
