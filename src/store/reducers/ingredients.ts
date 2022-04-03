import * as Actions from '../constants/ingredients';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { TIngredientsActionTypes } from '../actions/ingredients';

export type TIngredientsState = {
  loading: boolean | null;
  loaded: boolean;
  error: string | null;
  ingredients: IIngredient[];
  ingredientDragged: boolean
};

const initialState: TIngredientsState = {
  loading: null,
  loaded: false,
  error: null,
  ingredients: [],
  ingredientDragged: false,
};

export const ingredientsReducer = (
  state: TIngredientsState = initialState,
  action: TIngredientsActionTypes,
) => {
  switch (action.type) {
    case Actions.GET_INGREDIENTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case Actions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };
    case Actions.GET_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.DRAG_INGREDIENT:
      return {
        ...state,
        ingredientDragged: true,
      };
    case Actions.DROP_INGREDIENT:
      return {
        ...state,
        ingredientDragged: false,
      };
    default:
      return state;
  }
};
