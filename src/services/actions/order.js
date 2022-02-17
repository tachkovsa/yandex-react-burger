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
  }).then((res) => {
    if (res && res.success) {
      if (res.order && res.order.number) {
        dispatch({
          type: Actions.POST_ORDER_SUCCESS,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: Actions.POST_ORDER_FAILURE,
          payload: 'Server response contains no order number',
        });
      }
    } else {
      dispatch({
        type: Actions.POST_ORDER_FAILURE,
        payload: res.statusText,
      });
    }
  }).catch((err) => {
    dispatch({
      type: Actions.POST_ORDER_FAILURE,
      payload: err.toLocaleString(),
    });
  });
};
