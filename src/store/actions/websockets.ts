import * as Actions from '../constants/websockets';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed.interfaces';

export interface IWSConnectionRequest {
  readonly type: typeof Actions.WS_CONNECTION_REQUEST
  readonly payload: { url: string, type: TFeedTypes };
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
  readonly payload: TServerFeedMessage;
}

export interface IWSSendMessage {
  readonly type: typeof Actions.WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWSActionTypes =
    | IWSConnectionRequest | IWSConnectionSuccess | IWSConnectionError
    | IWSOnMessage | IWSSendMessage
    | IWSClose | IWSConnectionClosed;

export type TwsConnectParams = { url: string, type: TFeedTypes };
export const wsConnect = ({ url, type }: TwsConnectParams): IWSConnectionRequest => ({ type: Actions.WS_CONNECTION_REQUEST, payload: { url, type } });
export const wsConnectionSuccess = (): IWSConnectionSuccess => ({ type: Actions.WS_CONNECTION_SUCCESS });
export const wsConnectionError = (error: string): IWSConnectionError => ({ type: Actions.WS_CONNECTION_ERROR, payload: error });
export const wsDisconnect = (): IWSClose => ({ type: Actions.WS_CONNECTION_CLOSE });
export const wsConnectionClosed = (event: Event): IWSConnectionClosed => ({ type: Actions.WS_CONNECTION_CLOSED, payload: event });
export const wsOnMessage = (data: TServerFeedMessage): IWSOnMessage => ({ type: Actions.WS_ON_MESSAGE, payload: data });
