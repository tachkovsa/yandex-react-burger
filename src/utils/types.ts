import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TAuthActionTypes } from '../store/actions/auth';
import { TConstructorIngredientsActionTypes } from '../store/actions/constructor-ingredients';
import { TDetailedIngredientActionTypes } from '../store/actions/detailed-ingredient';
import { TIngredientsActionTypes } from '../store/actions/ingredients';
import { TOrderActionTypes } from '../store/actions/order';
import { TWSActionTypes } from '../store/actions/websockets';
import { TFeedActionTypes } from '../store/actions/feed';
import { store } from '../store';
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR, WS_CONNECTION_REQUEST, WS_ON_MESSAGE,
  WS_SEND_MESSAGE,
} from '../store/constants/websockets';

export type TApplicationActions =
    | TAuthActionTypes
    | TConstructorIngredientsActionTypes
    | TDetailedIngredientActionTypes
    | TIngredientsActionTypes
    | TOrderActionTypes
    | TFeedActionTypes
    | TWSActionTypes;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type TWSMiddlewareActions = {
  readonly onInit: typeof WS_CONNECTION_REQUEST;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onClose: typeof WS_CONNECTION_CLOSE;
  readonly onClosed: typeof WS_CONNECTION_CLOSED;
  readonly onSend: typeof WS_SEND_MESSAGE;
  readonly onMessage: typeof WS_ON_MESSAGE;
  // readonly onOpen: typeof FEED_FETCH_ORDERS;
  // readonly onMessage: typeof FEED_RECEIVE_ORDERS;
};
