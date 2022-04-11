import * as Actions from '../constants/websockets';
import { TWSActionTypes } from '../actions/websockets';

export type TWebSocketsState = {
  connected: boolean;
  error: string | null;
  messages: string[];
};

export const initialState: TWebSocketsState = {
  connected: false,
  error: null,
  messages: [],
};

export const websocketsReducer = (
  state: TWebSocketsState = initialState,
  action: TWSActionTypes,
) => {
  switch (action.type) {
    case Actions.WS_CONNECTION_REQUEST:
      return {
        ...state,
        connected: false,
        error: null,
      };
    case Actions.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case Actions.WS_CONNECTION_ERROR:
      return {
        ...state,
        connected: false,
        error: action.payload,
      };
    case Actions.WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case Actions.WS_ON_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
