import * as Actions from '../constants/order';
import { TOrderActionTypes } from '../actions/order';

export type TOrderState = {
  loading: boolean;
  error: string | null;
  orderNumber: number | null;
  burgerName: string | null;
};

export const initialState: TOrderState = {
  loading: false,
  error: null,
  orderNumber: null,
  burgerName: null,
};

export const orderReducer = (
  state: TOrderState = initialState,
  action: TOrderActionTypes,
) => {
  switch (action.type) {
    case Actions.POST_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
        orderNumber: null,
        burgerName: null,
      };
    case Actions.POST_ORDER_SUCCESS: {
      const { orderNumber, burgerName } = action.payload;

      return {
        ...state,
        loading: false,
        error: null,
        orderNumber,
        burgerName,
        showModal: true,
      };
    }
    case Actions.POST_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.RESET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: null,
      };
    default:
      return state;
  }
};
