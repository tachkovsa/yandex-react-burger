import { domainURL } from '../../utils/constants';

import Actions from './index';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: Actions.GET_INGREDIENTS,
  });

  fetch(`${domainURL}/api/ingredients`)
    .then((res) => {
      if (res && res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.statusText));
    })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        dispatch({
          type: Actions.GET_INGREDIENTS_SUCCESS,
          payload: parsedResponse.data,
        });
      } else {
        return Promise.reject(new Error('Что-то пошло не так...'));
      }
    })
    .catch((err) => {
      dispatch({
        type: Actions.GET_INGREDIENTS_FAILURE,
        payload: err.toLocaleString(),
      });
    });
};
