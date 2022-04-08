import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';
import { socketMiddleware } from '../services/websockets';
import { TWSMiddlewareActions } from '../utils/types';
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_REQUEST,
  WS_ON_MESSAGE,
  WS_SEND_MESSAGE,
} from './constants/websockets';

const wsActions: TWSMiddlewareActions = {
  onInit: WS_CONNECTION_REQUEST,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onSend: WS_SEND_MESSAGE,
  // onOpen: ,
  onMessage: WS_ON_MESSAGE,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(wsActions)),
  ),
);
