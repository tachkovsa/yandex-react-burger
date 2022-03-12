import React from 'react';
import { useSelector } from 'react-redux';

import { getCookie, setCookie } from '../utils/cookie';
import { AUTH_TOKEN_ALIVE_TIME } from '../utils/constants';

export const setTokens = ({ accessToken, refreshToken }) => {
  const expirationAt = new Date(new Date().getTime() + AUTH_TOKEN_ALIVE_TIME);

  setCookie('accessToken', accessToken, { expires: expirationAt });
  setCookie('refreshToken', refreshToken);
};

export const getTokens = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  return { accessToken, refreshToken };
};

export const auth = () => {
  const { accessToken, refreshToken } = getTokens();

  return { accessToken, refreshToken };
};
