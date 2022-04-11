import * as Actions from '../constants/detailed-ingredient';
import { TDetailedIngredientActionTypes } from '../actions/detailed-ingredient';

export type TDetailedIngredientState = {
  detailedIngredient: string | null;
};

export const initialState = {
  detailedIngredient: null,
};

export const detailedIngredientReducer = (
  state: TDetailedIngredientState = initialState,
  action: TDetailedIngredientActionTypes,
) => {
  switch (action.type) {
    case Actions.SET_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: action.payload,
      };
    case Actions.RESET_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: null,
      };
    default:
      return state;
  }
};
