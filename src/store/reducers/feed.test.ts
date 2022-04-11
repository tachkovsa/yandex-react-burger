import * as constants from '../constants/feed';
import { feedReducer, initialState } from './feed';
import { IProcessOrdersPayload } from '../actions/feed';
import { IOrderDetails } from '../../utils/interfaces/order.interface';

describe('Feed wreducer', () => {
  const order: IOrderDetails = {
    createdAt: '2022-04-11T12:49:52.316Z',
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd'],
    name: 'Space антарианский астероидный био-марсианский метеоритный экзо-плантаго флюоресцентный бургер',
    number: 13362,
    status: 'done',
    updatedAt: '2022-04-11T12:49:52.499Z',
    _id: '625423f01a3b2c001bcfea7b',
  };

  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(feedReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should append all orders', () => {
    const payload: IProcessOrdersPayload = {
      data: {
        orders: [order],
        total: 10,
        totalToday: 3,
        success: true,
      },
      type: 'all',
    };

    expect(feedReducer(initialState, { type: constants.PROCESS_ORDERS, payload }))
      .toEqual({
        ...initialState,
        orders: [order],
        total: 10,
        totalToday: 3,
      });
  });

  it('Should append my orders', () => {
    const payload: IProcessOrdersPayload = {
      data: {
        orders: [order],
        total: 10,
        totalToday: 3,
        success: true,
      },
      type: 'my',
    };

    expect(feedReducer(initialState, { type: constants.PROCESS_ORDERS, payload }))
      .toEqual({
        ...initialState,
        orders: [{ ...order, _isOwn: true }],
        total: 10,
        totalToday: 3,
      });
  });
});
