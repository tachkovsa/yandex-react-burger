import * as Actions from '../constants/websockets';

export interface IWSConnectionRequest {
  readonly type: typeof Actions.WS_CONNECTION_REQUEST
}

export interface IWSConnectionSuccess {
  readonly type: typeof Actions.WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof Actions.WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWSClose {
  readonly type: typeof Actions.WS_CONNECTION_CLOSE;
}

export interface IWSConnectionClosed {
  readonly type: typeof Actions.WS_CONNECTION_CLOSED;
  readonly payload: Event;
}

export interface IWSOnMessage {
  readonly type: typeof Actions.WS_ON_MESSAGE;
  readonly payload: string;
}

export interface IWSSendMessage {
  readonly type: typeof Actions.WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWSActionTypes =
    | IWSConnectionRequest | IWSConnectionSuccess | IWSConnectionError
    | IWSOnMessage | IWSSendMessage
    | IWSClose | IWSConnectionClosed;

export const wsConnect = () => ({ type: Actions.WS_CONNECTION_REQUEST });
export const wsDisconnect = () => ({ type: Actions.WS_CONNECTION_CLOSE });
