import { domainURL } from '../../utils/constants';

import Actions from './index';
import { getCookie, setCookie } from '../../utils/cookie';

export const registerUser = ({ email, name, password }) => (dispatch) => {
  dispatch({ type: Actions.REGISTER_USER });

  fetch(`${domainURL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password }),
  })
    .then((res) => {
      if (res && (res.ok || res.status === 403)) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { user, accessToken, refreshToken } = parsedResponse;

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

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
    })
    .catch((err) => {
      dispatch({
        type: Actions.REGISTER_USER_ERROR,
        payload: err.toLocaleString(),
      });
    });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: Actions.LOGIN });

  fetch(`${domainURL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res && (res.ok || res.status === 401)) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { user, accessToken, refreshToken } = parsedResponse;

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

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
    })
    .catch((err) => {
      dispatch({
        type: Actions.LOGIN_ERROR,
        payload: err.toLocaleString(),
      });
    });
};

export const refreshToken = () => (dispatch) => {
  dispatch({ type: Actions.REFRESH_TOKEN });

  fetch(`${domainURL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  })
    .then((res) => {
      if (res && res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { accessToken, refreshToken } = parsedResponse;

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

        dispatch({ type: Actions.REFRESH_TOKEN_SUCCESS });
      } else {
        return Promise.reject(parsedResponse.message);
      }
    })
    .catch((err) => {
      dispatch({
        type: Actions.REFRESH_TOKEN_ERROR,
        payload: err.toLocaleString(),
      });
    });
};

export const requestPasswordResetCode = (email) => (dispatch) => {
  dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE });

  fetch(`${domainURL}/api/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => {
      if (res && res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS });
      } else {
        return Promise.reject(parsedResponse.message);
      }
    })
    .catch((err) => {
      dispatch({
        type: Actions.REQUEST_PASSWORD_RESET_CODE_ERROR,
        payload: err.toLocaleString(),
      });
    });
};
