import { domainURL } from '../../utils/constants';

import Actions from './index';
import { setCookie } from '../../utils/cookie';
import { getTokens, setTokens } from '../../services/auth';
import { request } from '../../services/api';

export const resetAuth = (reason) => (dispatch) => {
  console.error(`Authentication reset cause ${reason}`);

  const selfDestructiveExpiration = new Date('1970-01-01');
  setCookie('accessToken', null, { expires: selfDestructiveExpiration });
  setCookie('refreshToken', null, { expires: selfDestructiveExpiration });

  dispatch({ type: Actions.RESET_AUTH });
};

export const registerUser = ({ email, name, password }) => (dispatch) => {
  dispatch({ type: Actions.REGISTER_USER });

  request({
    url: 'auth/register',
    method: 'POST',
    body: JSON.stringify({ email, name, password }),
  })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { user, accessToken, refreshToken } = parsedResponse;
        setTokens({ accessToken, refreshToken });

        dispatch({
          type: Actions.REGISTER_USER_SUCCESS,
          payload: user,
        });
      } else {
        const errorMessage = parsedResponse.message === 'User already exists'
          ? 'Пользователь с таким e-mail уже есть в системе'
          : parsedResponse.message;

        return Promise.reject(errorMessage);
      }
    }).catch((err) => dispatch({
      type: Actions.REGISTER_USER_ERROR,
      payload: err.toLocaleString(),
    }));
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: Actions.LOGOUT });

  const { refreshToken } = getTokens();
  request({
    url: 'auth/logout',
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      dispatch({ type: Actions.LOGOUT_SUCCESS });
      dispatch({ type: Actions.RESET_AUTH });
    } else {
      return Promise.reject(parsedResponse.message);
    }
  }).catch((err) => {
    dispatch({
      type: Actions.LOGOUT_ERROR,
      payload: err.toLocaleString(),
    });
  });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: Actions.LOGIN });

  request({
    url: 'auth/login',
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      const { user, accessToken, refreshToken } = parsedResponse;
      setTokens({ accessToken, refreshToken });

      dispatch({
        type: Actions.LOGIN_SUCCESS,
        payload: user,
      });
    } else {
      const errorMessage = parsedResponse.message === 'email or password are incorrect'
        ? 'e-mail или пароль указаны неверно'
        : parsedResponse.message;

      return Promise.reject(errorMessage);
    }
  }).catch((err) => {
    dispatch({
      type: Actions.LOGIN_ERROR,
      payload: err.toLocaleString(),
    });
  });
};

export const patchUser = ({ name, email, password }) => (dispatch) => {
  dispatch({ type: Actions.PATCH_USER_INFO });

  request({
    url: 'auth/user',
    method: 'PATCH',
    body: JSON.stringify({ name, email, password }),
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      const { user } = parsedResponse;

      dispatch({
        type: Actions.PATCH_USER_INFO_SUCCESS,
        payload: user,
      });
    } else {
      return Promise.reject(parsedResponse.message);
    }
  }).catch((err) => {
    dispatch({
      type: Actions.FETCH_USER_INFO_ERROR,
      payload: err.toLocaleString(),
    });
  });
};

export const fetchUser = () => (dispatch) => {
  dispatch({ type: Actions.FETCH_USER_INFO });

  request({
    url: 'auth/user',
    type: 'GET',
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      const { user } = parsedResponse;

      dispatch({
        type: Actions.FETCH_USER_INFO_SUCCESS,
        payload: user,
      });
    } else {
      return Promise.reject(parsedResponse.message);
    }
  })
    .catch((err) => {
      dispatch({
        type: Actions.FETCH_USER_INFO_ERROR,
        payload: err.toLocaleString(),
      });
    });
};

export const resetPassword = ({ email, password, token }) => (dispatch) => {
  dispatch({ type: Actions.PASSWORD_RESET });

  request({
    url: 'password-reset/reset',
    method: 'POST',
    body: JSON.stringify({ token, password }),
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      dispatch({ type: Actions.PASSWORD_RESET_SUCCESS });
      dispatch(loginUser({ email, password }));
    } else {
      return Promise.reject(parsedResponse.message);
    }
  }).catch((err) => {
    dispatch({
      type: Actions.PASSWORD_RESET_ERROR,
      payload: err.toLocaleString(),
    });
  });
};

export const requestPasswordResetCode = (email) => (dispatch) => {
  dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE });

  request({
    url: 'password-reset',
    method: 'POST',
    body: JSON.stringify({ email }),
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS });
    } else {
      return Promise.reject(parsedResponse.message);
    }
  }).catch((err) => {
    dispatch({
      type: Actions.REQUEST_PASSWORD_RESET_CODE_ERROR,
      payload: err.toLocaleString(),
    });
  });
};
