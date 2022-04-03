import * as Actions from '../constants/detailed-ingredient';

export interface ISetDetailedIngredient {
  readonly type: typeof Actions.SET_DETAILED_INGREDIENT;
  readonly payload: string;
}
export interface IResetDetailedIngredient {
  readonly type: typeof Actions.RESET_DETAILED_INGREDIENT;
}
export type TDetailedIngredientActionTypes = ISetDetailedIngredient | IResetDetailedIngredient;

export const setDetailedIngredient = (ingredientId: string) => ({ type: Actions.SET_DETAILED_INGREDIENT, payload: ingredientId });
export const resetDetailedIngredient = () => ({ type: Actions.RESET_DETAILED_INGREDIENT });
