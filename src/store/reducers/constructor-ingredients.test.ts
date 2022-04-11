import * as constants from '../constants/constructor-ingredients';
import { constructorIngredientsReducer, initialState } from './constructor-ingredients';
import { IConstructorIngredient } from '../../utils/interfaces/constructor-ingredients.interface';

describe('Constructor Ingredients reducer', () => {
  const ingredients: IConstructorIngredient[] = [
    {
      _uid: 'df0f9eb2-12a3-4868-852f-836a14fc4623',
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
    },
    {
      _uid: 'b4a9fe5a-15ed-41ee-b0bb-3ad26042f2cc',
      _id: '60d3b41abdacab0026a733c6',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    },
    {
      _uid: 'b1da744d-9a80-48a0-bba4-37a4ad1adadc',
      _id: '60d3b41abdacab0026a733cd',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0,
    },
    {
      _uid: '25e8b518-729e-43cc-98bd-4fea9e4bcc28',
      _id: '60d3b41abdacab0026a733cf',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0,
    },
  ];

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  if (buns.length < 2) {
    throw new Error('Mocks ingredients should contain two or more ingredients with type "bun"');
  }

  const notBun = ingredients.filter((ingredient) => ingredient.type !== 'bun');
  if (notBun.length < 2) {
    throw new Error('Mocks ingredients should contain two or more ingredients with type, other than "bun"');
  }

  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(constructorIngredientsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should add bun to basket', () => {
    const payload = buns[0];
    expect(constructorIngredientsReducer(initialState, { type: constants.ADD_INGREDIENT_TO_CONSTRUCTOR, payload }))
      .toEqual({ ...initialState, basket: [payload] });
  });

  it('Should replace bun in basket', () => {
    const payload = buns[1];
    expect(constructorIngredientsReducer({
      ...initialState,
      basket: [buns[0]],
    }, { type: constants.ADD_BUN_TO_CONSTRUCTOR, payload }))
      .toEqual({ ...initialState, basket: [payload] });
  });

  it('Should add ingredient to basket', () => {
    const payload = ingredients[ingredients.length - 1];
    expect(constructorIngredientsReducer({
      ...initialState,
      basket: [ingredients[0]],
    }, { type: constants.ADD_INGREDIENT_TO_CONSTRUCTOR, payload }))
      .toEqual({ ...initialState, basket: [ingredients[0], payload] });
  });

  it('Should remove ingredient from basket', () => {
    const lastIngredient = ingredients[ingredients.length - 1];
    const payload = lastIngredient._uid;
    expect(constructorIngredientsReducer({
      ...initialState,
      basket: [ingredients[0], lastIngredient],
    }, { type: constants.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, payload }))
      .toEqual({ ...initialState, basket: [ingredients[0]] });
  });

  it('Should reset ingredients in basket', () => {
    expect(constructorIngredientsReducer({
      ...initialState,
      basket: [ingredients[0], ingredients[1]],
    }, { type: constants.RESET_CONSTRUCTOR_INGREDIENTS }))
      .toEqual({ ...initialState, basket: [] });
  });

  it('Should change constructor ingredients position', () => {
    const firstIngredient = notBun[0];
    const secondIngredient = notBun[1];

    const payload = {
      whichIngredientDroppedId: firstIngredient._uid,
      onWhichIngredientDroppedId: secondIngredient._uid,
    };

    expect(constructorIngredientsReducer({
      ...initialState,
      basket: [firstIngredient, secondIngredient],
    }, { type: constants.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION, payload }))
      .toEqual({
        ...initialState,
        basket: [secondIngredient, firstIngredient],
      });
  });
});
