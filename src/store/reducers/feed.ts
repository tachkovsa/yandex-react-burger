import { TFeedActionTypes } from '../actions/feed';
import { IOrderDetails } from '../../utils/interfaces/order.interface';
import * as Actions from '../constants/feed';

export type TFeedState = {
  orders: IOrderDetails[] | null;
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedState = {
  orders: null,
  total: null,
  totalToday: null,
};

export const feedReducer = (
  state: TFeedState = initialState,
  action: TFeedActionTypes,
) => {
  switch (action.type) {
    case Actions.PROCESS_ORDERS: {
      const { data: { orders, total, totalToday }, type } = action.payload;
      return {
        ...state,
        orders: type === 'my' ? orders.map((order) => ({ ...order, _isOwn: true })) : orders,
        total,
        totalToday,
      };
    }
    default:
      return state;
  }
};
