import { domainURL } from '../utils/constants';
import { auth, setTokens } from './auth';

import { store } from '../store';
import { resetAuth } from '../store/actions/auth';

const restoreSession = async ({ refreshToken }) => {
  const success = await fetch(`${domainURL}/api/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then((res) => {
    if (res && res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(res.statusText));
  }).then((parsedResponse) => {
    if (parsedResponse.success) {
      const { accessToken, refreshToken } = parsedResponse;
      setTokens({ accessToken, refreshToken });

      return true;
    }

    return Promise.reject(parsedResponse.message);
  }).catch((err) => false);

  return success;
};

export const request = async ({
  url = '', method = 'GET', body = {}, headers = {},
}) => {
  const { accessToken, refreshToken } = auth();

  if (!accessToken && refreshToken) {
    await restoreSession({ refreshToken });
  }

  const result = await fetch(new URL(url, `${domainURL}/api/`).href, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: (accessToken || null),
      ...headers,
    },
    body: ['GET', 'HEAD'].includes(method) && !!body ? null : body,
  }).then((res) => {
    if (res) {
      if (res.status === 401) {
        store.dispatch(resetAuth());
      }
      return res.json();
    }
    return Promise.reject(new Error(res.statusText));
  });

  return result;
};
