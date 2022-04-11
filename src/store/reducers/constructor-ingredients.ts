import * as Actions from '../constants/constructor-ingredients';
import { IConstructorIngredient } from '../../utils/interfaces/constructor-ingredients.interface';
import { TConstructorIngredientsActionTypes } from '../actions/constructor-ingredients';

export type TConstructorIngredientsState = {
  basket: IConstructorIngredient[];
};

export const initialState: TConstructorIngredientsState = {
  basket: [],
};

export const constructorIngredientsReducer = (
  state:TConstructorIngredientsState = initialState,
  action: TConstructorIngredientsActionTypes,
) => {
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
      };
    case Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION: {
      const { whichIngredientDroppedId, onWhichIngredientDroppedId } = action.payload;

      const basket = [...state.basket];
      const draggedItemIndex = basket.findIndex((ingredient) => ingredient._uid === whichIngredientDroppedId);
      const hoveredItemIndex = basket.findIndex((ingredient) => ingredient._uid === onWhichIngredientDroppedId);

      const draggedItem = basket[draggedItemIndex];
      const hoveredItem = basket[hoveredItemIndex];

      basket[draggedItemIndex] = hoveredItem;
      basket[hoveredItemIndex] = draggedItem;

      return {
        ...state,
        basket,
      };
    }
    default:
      return state;
  }
};
