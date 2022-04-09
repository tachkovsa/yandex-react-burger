import * as Actions from '../constants/constructor-ingredients';
import { IConstructorIngredient } from '../../utils/interfaces/constructor-ingredients.interface';

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

export const addBunToConstructor = (ingredient: IConstructorIngredient): IAddBunToConstructor => ({ type: Actions.ADD_BUN_TO_CONSTRUCTOR, payload: ingredient });
export const addIngredientToConstructor = (ingredient: IConstructorIngredient): IAddIngredientToConstructor => ({ type: Actions.ADD_INGREDIENT_TO_CONSTRUCTOR, payload: ingredient });
export const removeIngredientFromConstructor = (ingredientUid: string): IRemoveIngredientFromConstructor => ({ type: Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, payload: ingredientUid });
export const resetConstructorIngredients = (): IResetConstructorIngredients => ({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
type TChangeConstructorIngredientPositionParams = { whichIngredientDroppedId: string, onWhichIngredientDroppedId: string };
export const changeConstructorIngredientPosition = ({
  whichIngredientDroppedId,
  onWhichIngredientDroppedId,
}: TChangeConstructorIngredientPositionParams): IChangeConstructorIngredientPosition => ({
  type: Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
  payload: {
    whichIngredientDroppedId,
    onWhichIngredientDroppedId,
  },
});
