import { domainURL } from '../../utils/constants';

import Actions from './index';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: Actions.GET_INGREDIENTS,
  });

  fetch(`${domainURL}/api/ingredients`)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: Actions.GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: Actions.GET_INGREDIENTS_FAILURE,
          payload: res.statusText,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: Actions.GET_INGREDIENTS_FAILURE,
        payload: err.toLocaleString(),
      });
    });
};
