import * as Actions from '../constants/detailed-ingredient';
import { AppDispatch, AppThunk } from '../../utils/types';

export interface ISetDetailedIngredient {
  readonly type: typeof Actions.SET_DETAILED_INGREDIENT;
  readonly payload: string;
}
export interface IResetDetailedIngredient {
  readonly type: typeof Actions.RESET_DETAILED_INGREDIENT;
}
export type TDetailedIngredientActionTypes = ISetDetailedIngredient | IResetDetailedIngredient;

export const setDetailedIngredient: AppThunk<ISetDetailedIngredient> = (ingredientId: string) => (dispatch: AppDispatch) => dispatch({ type: Actions.SET_DETAILED_INGREDIENT, payload: ingredientId });
export const resetDetailedIngredient: AppThunk<IResetDetailedIngredient> = () => (dispatch: AppDispatch) => dispatch({ type: Actions.RESET_DETAILED_INGREDIENT });
