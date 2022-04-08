import { Middleware } from 'redux';

import { rootReducer } from '../store/reducers';
import * as wsActions from '../store/constants/websockets';
import { TApplicationActions } from '../utils/types';
import { webSocketURL } from '../utils/constants';
import { TServerFeedMessage } from '../utils/interfaces/feed.interfaces';
import { getTokens } from './auth';
import { processOrders } from '../store/actions/feed';

export const wsMiddleware: Middleware<{}, ReturnType<typeof rootReducer>> = (store) => (next) => async (action: TApplicationActions) => {
  let ws: WebSocket | undefined;

  switch (action.type) {
    case wsActions.WS_CONNECTION_REQUEST: {
      const { dispatch } = store;
      const type = action.payload;

      let wsUrl = `${webSocketURL}/orders`;
      switch (type) {
        case 'all':
          wsUrl += '/all';
          break;
        case 'my': {
          const { accessToken } = getTokens();
          wsUrl += `?token=${accessToken?.split(' ')[1]}`;
          break;
        }
        default:
      }

      ws = new WebSocket(wsUrl);

      if (ws) {
        ws.onopen = () => dispatch({ type: wsActions.WS_CONNECTION_SUCCESS });
        ws.onerror = (event) => dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event.type });

        ws.onmessage = (event) => {
          const { data } = event;
          const parsedData: TServerFeedMessage = JSON.parse(data);

          dispatch({
            type: wsActions.WS_ON_MESSAGE,
            payload: parsedData,
          });

          dispatch(processOrders({ data: parsedData, type }));
        };

        ws.onclose = () => dispatch({ type: wsActions.WS_CONNECTION_CLOSED });
      }
      break;
    }
    case wsActions.WS_SEND_MESSAGE:
      if (ws) {
        ws.send(JSON.stringify(action.payload));
      }
      break;
    case wsActions.WS_CONNECTION_CLOSE:
      if (ws) {
        ws.close();
      }
      break;
    default:
  }

  next(action);
};
