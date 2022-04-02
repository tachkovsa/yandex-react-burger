import { setCookie } from '../../utils/cookie';
import { getTokens, setTokens } from '../../services/auth';
import { request } from '../../services/api';
import { objectHasKeys } from '../../utils/validation';
import { ILoginResponse, IFetchUserInfoResponse, IRegisterResponse } from '../../utils/interfaces/api.interface';
import { IUser } from '../../utils/interfaces/user.interface';

export const REGISTER_USER = 'auth/REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'auth/REGISTER_USER_ERROR';
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const RESET_AUTH = 'auth/RESET_AUTH';
export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'auth/LOGOUT_ERROR';
export const REQUEST_PASSWORD_RESET_CODE = 'auth/REQUEST_PASSWORD_RESET_CODE';
export const REQUEST_PASSWORD_RESET_CODE_SUCCESS = 'auth/REQUEST_PASSWORD_RESET_CODE_SUCCESS';
export const REQUEST_PASSWORD_RESET_CODE_ERROR = 'auth/REQUEST_PASSWORD_RESET_CODE_ERROR';
export const PASSWORD_RESET = 'auth/REQUEST_PASSWORD_RESET';
export const PASSWORD_RESET_SUCCESS = 'auth/REQUEST_PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'auth/REQUEST_PASSWORD_RESET_ERROR';
export const FETCH_USER_INFO = 'auth/FETCH_USER_INFO';
export const FETCH_USER_INFO_SUCCESS = 'auth/FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_ERROR = 'auth/FETCH_USER_INFO_ERROR';
export const PATCH_USER_INFO = 'auth/PATCH_USER_INFO';
export const PATCH_USER_INFO_SUCCESS = 'auth/PATCH_USER_INFO_SUCCESS';
export const PATCH_USER_INFO_ERROR = 'auth/PATCH_USER_INFO_ERROR';

export const resetAuth = (reason: string) => (dispatch) => {
  // eslint-disable-next-line no-console
  console.error(`Authentication reset cause ${reason}`);

  const selfDestructiveExpiration = new Date('1970-01-01');
  setCookie('accessToken', null, { expires: selfDestructiveExpiration });
  setCookie('refreshToken', null, { expires: selfDestructiveExpiration });

  dispatch({ type: RESET_AUTH });
};

type TRegisterUserParams = { email: string, name: string, password: string };
export const registerUserSuccess = (user: IUser) => ({ type: REGISTER_USER_SUCCESS, payload: user });
export const registerUserError = (error: string) => ({ type: REGISTER_USER_ERROR, payload: error });
export const registerUser = ({ email, name, password }: TRegisterUserParams) => (dispatch) => {
  dispatch({ type: REGISTER_USER });

  request({
    url: 'auth/register',
    method: 'POST',
    body: JSON.stringify({ email, name, password }),
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['user', 'accessToken', 'refreshToken'])) {
        const { user, accessToken, refreshToken } = parsedResponse as IRegisterResponse;
        setTokens({ accessToken, refreshToken });

        dispatch(registerUserSuccess(user));

        return;
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(registerUserError(err.toLocaleString())));
};

export const logoutUserSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutUserError = (error: string) => ({ type: LOGOUT_ERROR, payload: error });
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });

  const { refreshToken } = getTokens();
  request({
    url: 'auth/logout',
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(() => {
      dispatch(logoutUserSuccess());
      dispatch({ type: RESET_AUTH });
    })
    .catch((err) => dispatch(logoutUserError(err.toLocaleString())));
};

type TLoginUserParams = { email: string, password: string };
export const loginUserSuccess = (user: IUser) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginUserError = (error: string) => ({ type: LOGIN_ERROR, payload: error });
export const loginUser = ({ email, password }: TLoginUserParams) => (dispatch) => {
  dispatch({ type: LOGIN });

  request({
    url: 'auth/login',
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['user', 'accessToken', 'refreshToken'])) {
        const { user, accessToken, refreshToken } = parsedResponse as ILoginResponse;
        setTokens({ accessToken, refreshToken });

        dispatch(loginUserSuccess(user));

        return;
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(loginUserError(err.toLocaleString())));
};

type TPatchUserInfoParams = { email: string, name: string, password?: string };
export const patchUserInfoSuccess = (user: IUser) => ({ type: PATCH_USER_INFO_SUCCESS, payload: user });
export const patchUserInfoError = (error: string) => ({ type: PATCH_USER_INFO_ERROR, payload: error });
export const patchUser = ({ name, email, password }: TPatchUserInfoParams) => (dispatch) => {
  dispatch({ type: PATCH_USER_INFO });

  request({
    url: 'auth/user',
    method: 'PATCH',
    body: JSON.stringify({ name, email, password }),
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['user'])) {
        const { user } = parsedResponse as IFetchUserInfoResponse;

        dispatch(patchUserInfoSuccess(user));

        return;
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(patchUserInfoError(err.toLocaleString())));
};

export const fetchUserInfoSuccess = (user: IUser) => ({ type: FETCH_USER_INFO_SUCCESS, payload: user });
export const fetchUserInfoError = (error: string) => ({ type: FETCH_USER_INFO_ERROR, payload: error });
export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCH_USER_INFO });

  request({
    url: 'auth/user',
    method: 'GET',
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['user'])) {
        const { user } = parsedResponse as IFetchUserInfoResponse;

        dispatch(fetchUserInfoSuccess(user));

        return;
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(fetchUserInfoError(err.toLocaleString())));
};

type TResetPasswordParams = { email: string, password: string, token: string };
export const resetPasswordSuccess = () => ({ type: PASSWORD_RESET_SUCCESS });
export const resetPasswordError = (error: string) => ({ type: PASSWORD_RESET_ERROR, payload: error });
export const resetPassword = ({ email, password, token }: TResetPasswordParams) => (dispatch) => {
  dispatch({ type: PASSWORD_RESET });

  request({
    url: 'password-reset/reset',
    method: 'POST',
    body: JSON.stringify({ token, password }),
  })
    .then(() => {
      dispatch(resetPasswordSuccess());
      dispatch(loginUser({ email, password }));
    })
    .catch((err) => dispatch(resetPasswordError(err.toLocaleString())));
};

export const requestPasswordResetCodeSuccess = () => ({ type: REQUEST_PASSWORD_RESET_CODE_SUCCESS });
export const requestPasswordResetCodeError = (error: string) => ({ type: REQUEST_PASSWORD_RESET_CODE_ERROR, payload: error });
export const requestPasswordResetCode = (email: string) => (dispatch) => {
  dispatch({ type: REQUEST_PASSWORD_RESET_CODE, payload: email });

  request({
    url: 'password-reset',
    method: 'POST',
    body: JSON.stringify({ email }),
  })
    .then(() => {
      dispatch(requestPasswordResetCodeSuccess());
    })
    .catch((err) => requestPasswordResetCodeError(err.toLocaleString()));
};
