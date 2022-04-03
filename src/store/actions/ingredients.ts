import { request } from '../../services/api';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { objectHasKeys } from '../../utils/validation';
import { IIngredientsResponse } from '../../utils/interfaces/api.interface';
import * as Actions from '../constants/ingredients';

export interface IGetIngredients {
  readonly type: typeof Actions.GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof Actions.GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}
export interface IGetIngredientsError {
  readonly type: typeof Actions.GET_INGREDIENTS_ERROR;
  readonly payload: string;
}
export interface IDragIngredient {
  readonly type: typeof Actions.DRAG_INGREDIENT;
}
export interface IDropIngredient {
  readonly type: typeof Actions.DROP_INGREDIENT;
}

export type TIngredientsActionTypes =
    | IGetIngredients | IGetIngredientsSuccess | IGetIngredientsError
    | IDragIngredient | IDropIngredient;

export const getIngredientsSuccess = (ingredients: IIngredient[]) => ({ type: Actions.GET_INGREDIENTS_SUCCESS, payload: ingredients });
export const getIngredientsError = (error: string) => ({ type: Actions.GET_INGREDIENTS_ERROR, payload: error });
export const getIngredients = () => (dispatch) => {
  dispatch({
    type: Actions.GET_INGREDIENTS,
  });

  request({
    url: 'ingredients',
    method: 'GET',
  })
    .then((parsedResponse) => {
      if (objectHasKeys(parsedResponse, ['data'])) {
        const { data } = parsedResponse as IIngredientsResponse;

        dispatch(getIngredientsSuccess(data));

        return;
      }

      return Promise.reject(new Error('Unknown response'));
    })
    .catch((err) => dispatch(getIngredientsError(err.toLocaleString())));
};
export const dragIngredient = () => ({ type: Actions.DRAG_INGREDIENT });
export const dropIngredient = () => ({ type: Actions.DROP_INGREDIENT });
