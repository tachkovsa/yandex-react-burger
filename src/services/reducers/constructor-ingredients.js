import Actions from '../actions';

const initialState = {
  basket: [],
};

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_BUN: {
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
    case Actions.ADD_INGREDIENT:
      return {
        ...state,
        basket: [
          ...state.basket,
          action.payload,
        ],
      };
    case Actions.REMOVE_INGREDIENT: {
      return {
        ...state,
        basket: state.basket.filter((ingredient) => ingredient._uid !== action.payload),
      };
    }
    case Actions.RESET_INGREDIENTS:
      return {
        ...state,
        basket: [],
        readyForOrder: false,
      };
    default:
      return state;
  }
};
