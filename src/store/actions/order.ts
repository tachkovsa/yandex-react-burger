import { request } from '../../services/api';
import { objectHasKeys } from '../../utils/validation';
import { IPostOrderResponse } from '../../utils/interfaces/api.interface';
import { IOrder } from '../../utils/interfaces/order.interface';
import * as Actions from '../constants/order';
import { AppDispatch, AppThunk } from '../../utils/types';

export interface IPostOrder {
  readonly type: typeof Actions.POST_ORDER;
}
export interface IPostOrderSuccess {
  readonly type: typeof Actions.POST_ORDER_SUCCESS;
  readonly payload: IOrder;
}
export interface IPostOrderError {
  readonly type: typeof Actions.POST_ORDER_ERROR;
  readonly payload: string;
}

export interface IResetOrderNumber {
  readonly type: typeof Actions.RESET_ORDER_NUMBER;
}

export type TOrderActionTypes =
    | IPostOrder | IPostOrderSuccess | IPostOrderError
    | IResetOrderNumber;

type TPostOrderParams = { orderNumber: number, burgerName: string };
export const postOrderSuccess: AppThunk<IPostOrderSuccess> = ({ orderNumber, burgerName }: TPostOrderParams) => (dispatch: AppDispatch) => dispatch({ type: Actions.POST_ORDER_SUCCESS, payload: { orderNumber, burgerName } });
export const postOrderError: AppThunk<IPostOrderError> = (error: string) => (dispatch: AppDispatch) => dispatch({ type: Actions.POST_ORDER_ERROR, payload: error });
export const postOrder: AppThunk = (ingredients: string[]) => (dispatch: AppDispatch) => {
  dispatch({ type: Actions.POST_ORDER });

  request({
    url: 'orders',
    method: 'POST',
    body: JSON.stringify({ ingredients }),
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['order'])) {
        const { order } = parsedResponse as IPostOrderResponse;
        if (objectHasKeys(order, ['number', 'name'])) {
          const { number, name } = order;

          dispatch(postOrderSuccess({ orderNumber: number, burgerName: name }));

          return;
        }
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(postOrderError(err.toLocaleString())));
};

export const resetOrderNumber: AppThunk<IResetOrderNumber> = () => (dispatch: AppDispatch) => dispatch({ type: Actions.RESET_ORDER_NUMBER });
