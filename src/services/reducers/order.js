import Actions from '../actions';

const initialState = {
  loading: false,
  error: null,
  orderNumber: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.POST_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
        orderNumber: null,
      };
    case Actions.POST_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orderNumber: action.payload,
      };
    case Actions.POST_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
