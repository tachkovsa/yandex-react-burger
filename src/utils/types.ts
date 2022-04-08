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
