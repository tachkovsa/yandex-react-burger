import * as Actions from '../constants/feed';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed.interfaces';
import { AppDispatch, AppThunk } from '../../utils/types';

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

export const processOrders: AppThunk<IProcessOrders> = ({ data, type }: IProcessOrdersPayload) => (dispatch: AppDispatch) => dispatch({ type: Actions.PROCESS_ORDERS, payload: { data, type } });
export const setType: AppThunk<ISetType> = (type: TFeedTypes) => (dispatch: AppDispatch) => dispatch({ type: Actions.SET_TYPE, payload: type });
