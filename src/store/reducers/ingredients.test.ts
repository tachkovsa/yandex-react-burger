import * as constants from '../constants/ingredients';
import { ingredientsReducer, initialState } from './ingredients';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';

describe('Ingredients reducer', () => {
  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(ingredientsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should set loading value', () => {
    expect(ingredientsReducer({
      ...initialState,
      loading: false,
    }, { type: constants.GET_INGREDIENTS }))
      .toEqual({ ...initialState, loading: true });
  });

  it('Should append ingredients', () => {
    const payload : IIngredient[] = [{
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      name: 'Краторная булка N-200i',
      price: 1255,
      proteins: 80,
      type: 'bun',
      __v: 0,
      _id: '60d3b41abdacab0026a733c6',
    }];
    expect(ingredientsReducer(initialState, { type: constants.GET_INGREDIENTS_SUCCESS, payload }))
      .toEqual({
        ...initialState,
        loading: false,
        loaded: true,
        ingredients: [...payload],
      });
  });

  it('Should set error ', () => {
    const payload = '😥 Something went wrong...';

    expect(ingredientsReducer(initialState, { type: constants.GET_INGREDIENTS_ERROR, payload }))
      .toEqual({
        ...initialState,
        loading: false,
        error: payload,
      });
  });

  it('Should drag ingredient', () => {
    expect(ingredientsReducer({
      ...initialState,
      ingredientDragged: false,
    }, { type: constants.DRAG_INGREDIENT }))
      .toEqual({ ...initialState, ingredientDragged: true });
  });

  it('Should drop ingredient', () => {
    expect(ingredientsReducer(initialState, { type: constants.DROP_INGREDIENT }))
      .toEqual({ ...initialState, ingredientDragged: false });
  });
});
