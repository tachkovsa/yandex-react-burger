import Actions from '../actions';

const initialState = {
  loading: false,
  error: null,
  ingredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_INGREDIENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Actions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        error: null,
      };
    case Actions.GET_INGREDIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
