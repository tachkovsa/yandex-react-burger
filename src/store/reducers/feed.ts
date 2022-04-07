import * as Actions from '../constants/feed';
import { TFeedActionTypes } from '../actions/feed';
import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { TFeedTypes } from '../../utils/interfaces/feed.interfaces';

export type TFeedState = {
  type: TFeedTypes | null;
  allOrders: IOrderDetails[] | null;
  myOrders: IOrderDetails[] | null;
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedState = {
  type: null,
  allOrders: null,
  myOrders: null,
  total: null,
  totalToday: null,
};

export const feedReducer = (
  state: TFeedState = initialState,
  action: TFeedActionTypes,
) => {
  switch (action.type) {
    case Actions.PROCESS_ORDERS: {
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        allOrders: state.type === 'all' ? orders : state.allOrders,
        myOrders: state.type === 'my' ? orders : state.myOrders,
        total,
        totalToday,
      };
    }
    case Actions.SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};

// import * as Actions from '../constants/detailed-ingredient';
// import { TDetailedIngredientActionTypes } from '../actions/detailed-ingredient';
//
// export type TDetailedIngredientState = {
//   detailedIngredient: string | null;
// };
//
// const initialState = {
//   detailedIngredient: null,
// };
//
// export const detailedIngredientReducer = (
//   state: TDetailedIngredientState = initialState,
//   action: TDetailedIngredientActionTypes,
// ) => {
//   switch (action.type) {
//     case Actions.SET_DETAILED_INGREDIENT:
//       return {
//         ...state,
//         detailedIngredient: action.payload,
//       };
//     case Actions.RESET_DETAILED_INGREDIENT:
//       return {
//         ...state,
//         detailedIngredient: null,
//       };
//     default:
//       return state;
//   }
// };
