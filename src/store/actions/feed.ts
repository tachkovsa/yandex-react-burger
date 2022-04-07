import * as Actions from '../constants/feed';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed.interfaces';

export interface IProcessOrders {
  readonly type: typeof Actions.PROCESS_ORDERS;
  readonly payload: TServerFeedMessage;
}

export interface ISetType {
  readonly type: typeof Actions.SET_TYPE;
  readonly payload: TFeedTypes;
}

export type TFeedActionTypes =
    | IProcessOrders
    | ISetType;

export const processOrders = (feedMessage: TServerFeedMessage) => ({ type: Actions.PROCESS_ORDERS, payload: feedMessage });
export const setType = (type: TFeedTypes) => ({ type: Actions.SET_TYPE, payload: type });
