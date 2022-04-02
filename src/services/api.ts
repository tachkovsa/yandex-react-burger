import { domainURL } from '../utils/constants';
import { auth, setTokens } from './auth';

import { store } from '../store';
import { resetAuth } from '../store/actions/auth';
import { ICommonResponse, ITokenResponse } from '../utils/interfaces/api.interface';
import { objectHasKeys } from '../utils/validation';

const checkResponseType = (unknownRes: unknown): ICommonResponse | Promise<never> => {
  if (typeof unknownRes === 'object' && unknownRes !== null
      && objectHasKeys(unknownRes, ['success'])) {
    const knownResponse = unknownRes as ICommonResponse;

    if (knownResponse.success) {
      return knownResponse;
    }
    return Promise.reject(knownResponse.message);
  }
  return Promise.reject(new Error('Unknown response type'));
};

const checkResponse = (res: Response) => {
  if (res && res.ok) {
    return res.json().then(checkResponseType);
  }

  if (res.status === 401) {
    store.dispatch(resetAuth(res.statusText));
  }

  return Promise.reject(new Error(res.statusText));
};

const restoreSession = async ({ refreshToken }: { refreshToken: string }) => {
  const success = await fetch(`${domainURL}/api/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse)
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['accessToken', 'refreshToken'])) {
        const tokenResponse = parsedResponse as ITokenResponse;

        const { accessToken, refreshToken } = tokenResponse;
        setTokens({ accessToken, refreshToken });

        return true;
      }

      return Promise.reject(new Error('Unknown response'));
    }).catch(() => false);

  return success;
};

export const request = async ({
  url = '', method = 'GET', body = '', headers = {},
}) => {
  const { accessToken, refreshToken } = auth();

  if (!accessToken && refreshToken) {
    await restoreSession({ refreshToken });
  }

  headers = {
    'Content-Type': 'application/json',
    Authorization: (accessToken || undefined),
    ...headers,
  };

  const headersInit = new Headers();
  for (const key in headers) {
    headersInit.set(key, headers[key]);
  }

  const result = await fetch(new URL(url, `${domainURL}/api/`).href, {
    method,
    headers: headersInit,
    body: ['GET', 'HEAD'].includes(method) && !!body ? null : body,
  }).then(checkResponse);

  return result;
};
