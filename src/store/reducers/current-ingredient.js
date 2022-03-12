import Actions from '../actions';

const initialState = {
  detailedIngredient: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
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
