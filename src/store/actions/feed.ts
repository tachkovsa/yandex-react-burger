import * as Actions from '../constants/feed';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed.interfaces';

interface IProcessOrdersPayload {
  data: TServerFeedMessage,
  type: TFeedTypes
}
export interface IProcessOrders {
  readonly type: typeof Actions.PROCESS_ORDERS;
  readonly payload: IProcessOrdersPayload;
}

export interface ISetType {
  readonly type: typeof Actions.SET_TYPE;
  readonly payload: TFeedTypes;
}

export type TFeedActionTypes =
    | IProcessOrders
    | ISetType;

export const processOrders = ({ data, type }: IProcessOrdersPayload): IProcessOrders => ({ type: Actions.PROCESS_ORDERS, payload: { data, type } });
export const setType = (type: TFeedTypes): ISetType => ({ type: Actions.SET_TYPE, payload: type });
