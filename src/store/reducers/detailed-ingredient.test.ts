import * as constants from '../constants/detailed-ingredient';
import { detailedIngredientReducer, initialState } from './detailed-ingredient';

describe('Detailed Ingredient reducer', () => {
  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(detailedIngredientReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should set detailed ingredient', () => {
    expect(detailedIngredientReducer(initialState, { type: constants.SET_DETAILED_INGREDIENT, payload: '60d3b41abdacab0026a733cf' }))
      .toEqual({
        ...initialState,
        detailedIngredient: '60d3b41abdacab0026a733cf',
      });
  });

  it('Should reset detailed ingredient', () => {
    expect(detailedIngredientReducer({
      ...initialState,
      detailedIngredient: '60d3b41abdacab0026a733cf',
    }, { type: constants.RESET_DETAILED_INGREDIENT }))
      .toEqual({
        ...initialState,
        detailedIngredient: null,
      });
  });
});
