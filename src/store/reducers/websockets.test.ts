import { websocketsReducer, initialState } from './websockets';
import * as constants from '../constants/websockets';
import { webSocketURL } from '../../utils/constants';
import { TwsConnectParams } from '../actions/websockets';
import { TServerFeedMessage } from '../../utils/interfaces/feed.interfaces';

describe('WebSockets reducer', () => {
  it('Should return initial state', () => {
    /* @ts-ignore-next-line */
    expect(websocketsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('Should rollback to initial state', () => {
    const payload: TwsConnectParams = {
      type: 'all',
      url: `${webSocketURL}/orders`,
    };

    expect(websocketsReducer(initialState, { type: constants.WS_CONNECTION_REQUEST, payload }))
      .toEqual(initialState);
  });

  it('Should set success connection', () => {
    expect(websocketsReducer(initialState, { type: constants.WS_CONNECTION_SUCCESS }))
      .toEqual({
        ...initialState,
        connected: true,
      });
  });

  it('Should set refused connection', () => {
    const payload = '😥 Something went wrong...';

    expect(websocketsReducer({
      ...initialState,
      connected: true,
    }, {
      type: constants.WS_CONNECTION_ERROR,
      payload,
    }))
      .toEqual({
        ...initialState,
        connected: false,
        error: payload,
      });
  });

  it('Should close connection', () => {
    expect(websocketsReducer({
      ...initialState,
      connected: true,
    }, {
      type: constants.WS_CONNECTION_CLOSED,
      payload: new CloseEvent('null'),
    }))
      .toEqual({
        ...initialState,
        connected: false,
      });
  });

  it('Should append message', () => {
    const payload: TServerFeedMessage = {
      orders: [{
        createdAt: '2022-04-03T17:08:10.570Z',
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733ce'],
        name: 'Антарианский флюоресцентный традиционный-галактический бургер',
        number: 12785,
        status: 'done',
        updatedAt: '2022-04-03T17:08:10.740Z',
        _id: '6249d47a1a3b2c001bcf4e29',
      }],
      total: 10,
      totalToday: 1,
      success: true,
    };

    expect(websocketsReducer(initialState, {
      type: constants.WS_ON_MESSAGE,
      payload,
    }))
      .toEqual({
        ...initialState,
        messages: [...initialState.messages, payload],
      });
  });
});
