import Actions from '../actions';

const initialState = {
  basket: [],
};

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_BUN_TO_CONSTRUCTOR: {
      const bunIndex = state.basket.findIndex((b) => b.type === 'bun');
      const bun = action.payload;

      const updatedBasket = [...state.basket];
      if (bunIndex >= 0) {
        updatedBasket.splice(bunIndex, 1, bun);
      } else {
        updatedBasket.push(bun);
      }

      return {
        ...state,
        basket: updatedBasket,
      };
    }
    case Actions.ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        basket: [
          ...state.basket,
          action.payload,
        ],
      };
    case Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        basket: state.basket.filter((ingredient) => ingredient._uid !== action.payload),
      };
    }
    case Actions.RESET_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        basket: [],
        readyForOrder: false,
      };
    default:
      return state;
  }
};
