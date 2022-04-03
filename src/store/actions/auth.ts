import { setCookie } from '../../utils/cookie';
import { getTokens, setTokens } from '../../services/auth';
import { request } from '../../services/api';
import { objectHasKeys } from '../../utils/validation';
import { ILoginResponse, IFetchUserInfoResponse, IRegisterResponse } from '../../utils/interfaces/api.interface';
import { IUser } from '../../utils/interfaces/user.interface';
import * as Actions from '../constants/auth';

export interface IResetAuth {
  readonly type: typeof Actions.RESET_AUTH;
}
export interface IRegisterUser {
  readonly type: typeof Actions.REGISTER_USER;
}
export interface IRegisterUserSuccess {
  readonly type: typeof Actions.REGISTER_USER_SUCCESS;
  readonly payload: IUser;
}
export interface IRegisterUserError {
  readonly type: typeof Actions.REGISTER_USER_ERROR;
  readonly payload: string;
}
export interface ILogoutUser {
  readonly type: typeof Actions.LOGOUT;
}
export interface ILogoutUserSuccess {
  readonly type: typeof Actions.LOGOUT_SUCCESS;
}
export interface ILogoutUserError {
  readonly type: typeof Actions.LOGOUT_ERROR;
  readonly payload: string;
}
export interface ILoginUser {
  readonly type: typeof Actions.LOGIN;
}
export interface ILoginUserSuccess {
  readonly type: typeof Actions.LOGIN_SUCCESS;
  readonly payload: IUser;
}
export interface ILoginUserError {
  readonly type: typeof Actions.LOGIN_ERROR;
  readonly payload: string;
}
export interface IPatchUserInfo {
  readonly type: typeof Actions.PATCH_USER_INFO;
}
export interface IPatchUserInfoSuccess {
  readonly type: typeof Actions.PATCH_USER_INFO_SUCCESS;
  readonly payload: IUser;
}
export interface IPatchUserInfoError {
  readonly type: typeof Actions.PATCH_USER_INFO_ERROR;
  readonly payload: string;
}
export interface IFetchUserInfo {
  readonly type: typeof Actions.FETCH_USER_INFO;
}
export interface IFetchUserInfoSuccess {
  readonly type: typeof Actions.FETCH_USER_INFO_SUCCESS;
  readonly payload: IUser;
}
export interface IFetchUserInfoError {
  readonly type: typeof Actions.FETCH_USER_INFO_ERROR;
  readonly payload: string;
}
export interface IResetPassword {
  readonly type: typeof Actions.PASSWORD_RESET;
}
export interface IResetPasswordSuccess {
  readonly type: typeof Actions.PASSWORD_RESET_SUCCESS;
}
export interface IResetPasswordError {
  readonly type: typeof Actions.PASSWORD_RESET_ERROR;
  readonly payload: string;
}
export interface IRequestPasswordResetCode {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE;
  readonly payload: string;
}
export interface IRequestPasswordResetCodeSuccess {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS;
}
export interface IRequestPasswordResetCodeError {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE_ERROR;
  readonly payload: string;
}

export type TAuthActionTypes =
    | IResetAuth
    | IRegisterUser | IRegisterUserSuccess | IRegisterUserError
    | ILogoutUser | ILogoutUserSuccess | ILogoutUserError
    | ILoginUser | ILoginUserSuccess | ILoginUserError
    | IPatchUserInfo | IPatchUserInfoSuccess | IPatchUserInfoError
    | IFetchUserInfo | IFetchUserInfoSuccess | IFetchUserInfoError
    | IResetPassword | IResetPasswordSuccess | IResetPasswordError
    | IRequestPasswordResetCode | IRequestPasswordResetCodeSuccess | IRequestPasswordResetCodeError;

export const resetAuth = (reason: string) => (dispatch) => {
  // eslint-disable-next-line no-console
  console.error(`Authentication reset cause ${reason}`);

  const selfDestructiveExpiration = new Date('1970-01-01');
  setCookie('accessToken', null, { expires: selfDestructiveExpiration });
  setCookie('refreshToken', null, { expires: selfDestructiveExpiration });

  dispatch({ type: Actions.RESET_AUTH });
};

type TRegisterUserParams = { email: string, name: string, password: string };
export const registerUserSuccess = (user: IUser) => ({ type: Actions.REGISTER_USER_SUCCESS, payload: user });
export const registerUserError = (error: string) => ({ type: Actions.REGISTER_USER_ERROR, payload: error });
export const registerUser = ({ email, name, password }: TRegisterUserParams) => (dispatch) => {
  dispatch({ type: Actions.REGISTER_USER });

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

export const logoutUserSuccess = () => ({ type: Actions.LOGOUT_SUCCESS });
export const logoutUserError = (error: string) => ({ type: Actions.LOGOUT_ERROR, payload: error });
export const logoutUser = () => (dispatch) => {
  dispatch({ type: Actions.LOGOUT });

  const { refreshToken } = getTokens();
  request({
    url: 'auth/logout',
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(() => {
      dispatch(logoutUserSuccess());
      dispatch({ type: Actions.RESET_AUTH });
    })
    .catch((err) => dispatch(logoutUserError(err.toLocaleString())));
};

type TLoginUserParams = { email: string, password: string };
export const loginUserSuccess = (user: IUser) => ({ type: Actions.LOGIN_SUCCESS, payload: user });
export const loginUserError = (error: string) => ({ type: Actions.LOGIN_ERROR, payload: error });
export const loginUser = ({ email, password }: TLoginUserParams) => (dispatch) => {
  dispatch({ type: Actions.LOGIN });

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
export const patchUserInfoSuccess = (user: IUser) => ({ type: Actions.PATCH_USER_INFO_SUCCESS, payload: user });
export const patchUserInfoError = (error: string) => ({ type: Actions.PATCH_USER_INFO_ERROR, payload: error });
export const patchUser = ({ name, email, password }: TPatchUserInfoParams) => (dispatch) => {
  dispatch({ type: Actions.PATCH_USER_INFO });

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

export const fetchUserInfoSuccess = (user: IUser) => ({ type: Actions.FETCH_USER_INFO_SUCCESS, payload: user });
export const fetchUserInfoError = (error: string) => ({ type: Actions.FETCH_USER_INFO_ERROR, payload: error });
export const fetchUser = () => (dispatch) => {
  dispatch({ type: Actions.FETCH_USER_INFO });

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
export const resetPasswordSuccess = () => ({ type: Actions.PASSWORD_RESET_SUCCESS });
export const resetPasswordError = (error: string) => ({ type: Actions.PASSWORD_RESET_ERROR, payload: error });
export const resetPassword = ({ email, password, token }: TResetPasswordParams) => (dispatch) => {
  dispatch({ type: Actions.PASSWORD_RESET });

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

export const requestPasswordResetCodeSuccess = () => ({ type: Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS });
export const requestPasswordResetCodeError = (error: string) => ({ type: Actions.REQUEST_PASSWORD_RESET_CODE_ERROR, payload: error });
export const requestPasswordResetCode = (email: string) => (dispatch) => {
  dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE, payload: email });

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
