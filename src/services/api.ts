import { domainURL } from '../utils/constants';
import { auth, setTokens } from './auth';

import { store } from '../store';
import { resetAuth } from '../store/actions/auth';
import { ITokenResponse } from '../utils/interfaces/api.interface';
import { objectHasKeys } from '../utils/validation';

const checkResponse = (res: Response) => {
  if (res && res.ok) {
    return res.json();
  }

  if (res.status === 401) {
    store.dispatch(resetAuth());
  }

  return Promise.reject(new Error(res.statusText));
};

const restoreSession = async ({ refreshToken }: { refreshToken: string }) => {
  const success = await fetch(`${domainURL}/api/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse)
    .then((parsedResponse: unknown) => {
      if (typeof parsedResponse === 'object'
          && objectHasKeys(parsedResponse, ['accessToken', 'refreshToken'])
      ) {
        const tokenResponse = parsedResponse as ITokenResponse;

        if (tokenResponse.success) {
          const { accessToken, refreshToken } = tokenResponse;
          setTokens({ accessToken, refreshToken });

          return true;
        }

        return Promise.reject(tokenResponse.message);
      }

      return Promise.reject(new Error('Unknown response'));
    }).catch(() => false);

  return success;
};

export const request = async ({
  url = '', method = 'GET', body = '', headers = {},
}): Promise<unknown> => {
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
