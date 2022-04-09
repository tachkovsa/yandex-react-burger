import { Middleware, MiddlewareAPI } from 'redux';

import {
  AppDispatch, RootState, TApplicationActions, TWSMiddlewareActions,
} from '../utils/types';
import { TServerFeedMessage } from '../utils/interfaces/feed.interfaces';
import { processOrders } from '../store/actions/feed';

import {
  wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsOnMessage,
} from '../store/actions/websockets';

export const socketMiddleware = (wsActions: TWSMiddlewareActions): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => async (action: TApplicationActions) => {
  let ws: WebSocket | undefined;

  switch (action.type) {
    case wsActions.onInit: {
      const { dispatch } = store;
      const { url, type } = action.payload;

      ws = new WebSocket(url);

      if (ws) {
        ws.onopen = () => dispatch(wsConnectionSuccess());
        ws.onerror = (event) => dispatch(wsConnectionError(event.type));

        ws.onmessage = (event) => {
          const { data } = event;
          const parsedData: TServerFeedMessage = JSON.parse(data);

          dispatch(wsOnMessage(parsedData));
          dispatch(processOrders({ data: parsedData, type }));
        };

        ws.onclose = (event) => dispatch(wsConnectionClosed(event));
      }
      break;
    }
    case wsActions.onSend:
      if (ws) {
        ws.send(JSON.stringify(action.payload));
      }
      break;
    case wsActions.onClose:
      if (ws) {
        ws.close();
      }
      break;
    default:
  }

  next(action);
};
