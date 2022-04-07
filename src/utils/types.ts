import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { rootReducer } from '../store/reducers';
import { TAuthActionTypes } from '../store/actions/auth';
import { TConstructorIngredientsActionTypes } from '../store/actions/constructor-ingredients';
import { TDetailedIngredientActionTypes } from '../store/actions/detailed-ingredient';
import { TIngredientsActionTypes } from '../store/actions/ingredients';
import { TOrderActionTypes } from '../store/actions/order';
import { TWSActionTypes } from '../store/actions/websockets';

export type TAppActionTypes =
    | TAuthActionTypes
    | TConstructorIngredientsActionTypes
    | TDetailedIngredientActionTypes
    | TIngredientsActionTypes
    | TOrderActionTypes
    | TWSActionTypes;

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TAppActionTypes>>;
export type TAppDispatch = Dispatch<TAppActionTypes>;
