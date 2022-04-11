import * as constants from '../constants/auth';
import { authReducer, initialState } from './auth';
import { IUser } from '../../utils/interfaces/user.interface';

describe('Auth reducer', () => {
  const existsUser: IUser = {
    email: 'user@example.com',
    name: 'John Doe',
  };

  const updatedUser: IUser = {
    email: 'updatedUser@example.com',
    name: 'John Foo',
  };

  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(authReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should set loading while fetching user info', () => {
    expect(authReducer(initialState, { type: constants.FETCH_USER_INFO }))
      .toEqual({ ...initialState, loading: true });
  });

  it('Should set user info', () => {
    expect(authReducer({
      ...initialState,
      loading: true,
    }, { type: constants.FETCH_USER_INFO_SUCCESS, payload: existsUser }))
      .toEqual({
        ...initialState,
        loading: false,
        user: existsUser,
      });
  });

  it('Should set user fetching error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.FETCH_USER_INFO_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should set loading while patching user info', () => {
    expect(authReducer(initialState, { type: constants.PATCH_USER_INFO }))
      .toEqual({ ...initialState, loading: true });
  });

  it('Should update user info', () => {
    expect(authReducer({
      ...initialState,
      user: existsUser,
    }, { type: constants.PATCH_USER_INFO_SUCCESS, payload: updatedUser }))
      .toEqual({
        ...initialState,
        loading: false,
        user: updatedUser,
      });
  });

  it('Should set user patching error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.PATCH_USER_INFO_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should reset auth', () => {
    expect(authReducer({ ...initialState, user: existsUser }, { type: constants.RESET_AUTH }))
      .toEqual({
        ...initialState,
        user: null,
        tokenExpired: true,
      });
  });

  it('Should set loading while logout', () => {
    expect(authReducer(initialState, { type: constants.LOGOUT }))
      .toEqual({ ...initialState, loading: true });
  });

  it('Should set loading to false while logout', () => {
    expect(authReducer(initialState, { type: constants.LOGOUT_SUCCESS }))
      .toEqual({ ...initialState, loading: false });
  });

  it('Should set logout error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.LOGOUT_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should set loading while login', () => {
    expect(authReducer(initialState, { type: constants.LOGIN }))
      .toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
  });

  it('Should set loading to false while login', () => {
    expect(authReducer({
      ...initialState,
      loading: true,
    }, { type: constants.LOGIN_SUCCESS, payload: existsUser }))
      .toEqual({
        ...initialState,
        loading: false,
        user: existsUser,
      });
  });

  it('Should set login error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.LOGIN_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should set loading while register user', () => {
    expect(authReducer(initialState, { type: constants.REGISTER_USER }))
      .toEqual({
        ...initialState,
        loading: true,
        error: false,
      });
  });

  it('Should set loading to false while register user', () => {
    expect(authReducer({
      ...initialState,
      loading: true,
    }, { type: constants.REGISTER_USER_SUCCESS, payload: updatedUser }))
      .toEqual({
        ...initialState,
        loading: false,
        user: updatedUser,
      });
  });

  it('Should set register user error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.REGISTER_USER_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should set reset password mark and email when request password reset code', () => {
    expect(authReducer(initialState, {
      type: constants.REQUEST_PASSWORD_RESET_CODE,
      payload: existsUser.email,
    }))
      .toEqual({
        ...initialState,
        loading: true,
        error: false,
        resetPasswordCodeRequested: false,
        resetPasswordCodeEmail: existsUser.email,
      });
  });

  it('Should set loading to false while request password reset code succeeded', () => {
    expect(authReducer({
      ...initialState,
      resetPasswordCodeRequested: false,
      resetPasswordCodeEmail: existsUser.email,
      loading: true,
    }, { type: constants.REQUEST_PASSWORD_RESET_CODE_SUCCESS }))
      .toEqual({
        ...initialState,
        loading: false,
        resetPasswordCodeRequested: true,
        resetPasswordCodeEmail: existsUser.email,
      });
  });

  it('Should set password reset code error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer(initialState, { type: constants.REQUEST_PASSWORD_RESET_CODE_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        loading: false,
      });
  });

  it('Should set loading while password reset', () => {
    expect(authReducer(initialState, { type: constants.PASSWORD_RESET }))
      .toEqual({
        ...initialState,
        loading: true,
        error: false,
      });
  });

  it('Should reset email and code requested properties while password reset succeeded', () => {
    expect(authReducer({
      ...initialState,
      loading: true,
    }, { type: constants.PASSWORD_RESET_SUCCESS }))
      .toEqual({
        ...initialState,
        loading: false,
        resetPasswordCodeEmail: null,
        resetPasswordCodeRequested: false,
      });
  });

  it('Should set password reset error', () => {
    const payload = '😥 Something went wrong...';

    expect(authReducer({
      ...initialState,
      loading: true,
    }, { type: constants.PASSWORD_RESET_ERROR, payload }))
      .toEqual({
        ...initialState,
        error: payload,
        resetPasswordCodeRequested: false,
        loading: false,
      });
  });
});
