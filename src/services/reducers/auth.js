import Actions from '../actions';

const initialState = {
  user: null,
  loading: null,
  error: null,
  resetPasswordCodeRequested: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Actions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Actions.REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE:
      return {
        ...state,
        loading: true,
        error: false,
        resetPasswordCodeRequested: false,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordCodeRequested: true,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};