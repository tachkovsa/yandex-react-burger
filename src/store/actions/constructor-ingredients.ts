import * as Actions from '../constants/constructor-ingredients';
import { IConstructorIngredient } from '../../utils/interfaces/constructor-ingredients.interface';
import { AppDispatch, AppThunk } from '../../utils/types';

export interface IAddBunToConstructor {
  readonly type: typeof Actions.ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: IConstructorIngredient;
}
export interface IAddIngredientToConstructor {
  readonly type: typeof Actions.ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: IConstructorIngredient;
}
export interface IRemoveIngredientFromConstructor {
  readonly type: typeof Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: string;
}
export interface IResetConstructorIngredients {
  readonly type: typeof Actions.RESET_CONSTRUCTOR_INGREDIENTS;
}
export interface IChangeConstructorIngredientPosition {
  readonly type: typeof Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION;
  readonly payload: {
    whichIngredientDroppedId: string;
    onWhichIngredientDroppedId: string
  }
}

export type TConstructorIngredientsActionTypes =
    | IAddBunToConstructor | IAddIngredientToConstructor | IRemoveIngredientFromConstructor | IResetConstructorIngredients
    | IChangeConstructorIngredientPosition;

export const addBunToConstructor: AppThunk<IAddBunToConstructor> = (ingredient: IConstructorIngredient) => (dispatch: AppDispatch) => dispatch({ type: Actions.ADD_BUN_TO_CONSTRUCTOR, payload: ingredient });
export const addIngredientToConstructor: AppThunk<IAddIngredientToConstructor> = (ingredient: IConstructorIngredient) => (dispatch: AppDispatch) => dispatch({ type: Actions.ADD_INGREDIENT_TO_CONSTRUCTOR, payload: ingredient });
export const removeIngredientFromConstructor: AppThunk<IRemoveIngredientFromConstructor> = (ingredientUid: string) => (dispatch: AppDispatch) => dispatch({ type: Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, payload: ingredientUid });
export const resetConstructorIngredients: AppThunk<IResetConstructorIngredients> = () => (dispatch: AppDispatch) => dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
type TChangeConstructorIngredientPositionParams = { whichIngredientDroppedId: string, onWhichIngredientDroppedId: string };
export const changeConstructorIngredientPosition: AppThunk<IChangeConstructorIngredientPosition> = ({
  whichIngredientDroppedId,
  onWhichIngredientDroppedId,
}: TChangeConstructorIngredientPositionParams) => (dispatch: AppDispatch) => dispatch({
  type: Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
  payload: {
    whichIngredientDroppedId,
    onWhichIngredientDroppedId,
  },
});
