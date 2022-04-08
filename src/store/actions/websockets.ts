import * as Actions from '../constants/websockets';
import { TFeedTypes } from '../../utils/interfaces/feed.interfaces';
import { AppDispatch, AppThunk } from '../../utils/types';

export interface IWSConnectionRequest {
  readonly type: typeof Actions.WS_CONNECTION_REQUEST
  readonly payload: TFeedTypes;
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
  readonly payload: { data: string, type: TFeedTypes };
}

export interface IWSSendMessage {
  readonly type: typeof Actions.WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWSActionTypes =
    | IWSConnectionRequest | IWSConnectionSuccess | IWSConnectionError
    | IWSOnMessage | IWSSendMessage
    | IWSClose | IWSConnectionClosed;

export const wsConnect: AppThunk<IWSConnectionRequest> = (type: TFeedTypes) => (dispatch: AppDispatch) => dispatch({ type: Actions.WS_CONNECTION_REQUEST, payload: type });
export const wsDisconnect: AppThunk<IWSClose> = () => (dispatch: AppDispatch) => dispatch({ type: Actions.WS_CONNECTION_CLOSE });
