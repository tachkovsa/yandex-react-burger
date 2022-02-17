import Actions from '../actions';

const initialState = {
  ingredients: [],
};

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case Actions.REMOVE_INGREDIENT: {
      const ingredientIndex = state.ingredients
        .findIndex((ingredient) => ingredient === action.payload);

      return {
        ...state,
        ingredients: [...state.ingredients].splice(ingredientIndex, 1),
      };
    }
    case Actions.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [],
      };
    default:
      return state;
  }
};
