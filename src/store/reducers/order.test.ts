import * as constants from '../constants/order';
import { orderReducer, initialState } from './order';

describe('Order reducer', () => {
  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(orderReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should set loading value', () => {
    expect(orderReducer(initialState, { type: constants.POST_ORDER }))
      .toEqual({
        ...initialState,
        loading: true,
        orderNumber: null,
        burgerName: null,
      });
  });

  it('Should set order info and show modal', () => {
    const payload = {
      orderNumber: 1000,
      burgerName: '🍔 Tasty burger',
    };

    expect(orderReducer({
      ...initialState,
      loading: true,
    }, { type: constants.POST_ORDER_SUCCESS, payload }))
      .toEqual({
        ...initialState,
        ...payload,
        loading: false,
        showModal: true,
      });
  });

  it('Should set order error', () => {
    const payload = '😥 Something went wrong...';

    expect(orderReducer({
      ...initialState,
      loading: true,
    }, { type: constants.POST_ORDER_ERROR, payload }))
      .toEqual({
        ...initialState,
        loading: false,
        error: payload,
      });
  });

  it('Should reset order number', () => {
    expect(orderReducer({
      ...initialState,
      orderNumber: 1000,
    }, { type: constants.RESET_ORDER_NUMBER }))
      .toEqual({
        ...initialState,
        orderNumber: null,
      });
  });
});
