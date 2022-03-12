import Actions from '../actions';

const initialState = {
  loading: null,
  loaded: false,
  error: null,
  ingredients: [],
  ingredientDragged: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
