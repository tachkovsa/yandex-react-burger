import * as Actions from '../constants/websockets';
import { TWSActionTypes } from '../actions/websockets';
// import { TFeedTypes } from '../../utils/interfaces/feed.interfaces';

export type TWebSocketsState = {
  // type: TFeedTypes | null;
  connected: boolean;
  error: string | null;
  messages: string[];
};

const initialState: TWebSocketsState = {
  // type: null,
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
