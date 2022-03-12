import { domainURL } from '../../utils/constants';

import Actions from './index';

export const postOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: Actions.POST_ORDER,
  });

  fetch(`${domainURL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => {
      if (res && res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        dispatch({
          type: Actions.POST_ORDER_SUCCESS,
          payload: {
            orderNumber: parsedResponse.order.number,
            burgerName: parsedResponse.order.name,
          },
        });
      } else {
        return Promise.reject(new Error('Что-то пошло не так...'));
      }
    })
    .catch((err) => {
      dispatch({
        type: Actions.POST_ORDER_ERROR,
        payload: err.toLocaleString(),
      });
    });
};
