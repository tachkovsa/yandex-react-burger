import Actions from '../actions';

const initialState = {
  loading: false,
  error: null,
  orderNumber: null,
  burgerName: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.POST_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
        orderNumber: null,
        burgerName: null,
      };
    case Actions.POST_ORDER_SUCCESS: {
      const { orderNumber, burgerName } = action.payload;

      return {
        ...state,
        loading: false,
        error: null,
        orderNumber,
        burgerName,
        showModal: true,
      };
    }
    case Actions.POST_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.RESET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: null,
      };
    default:
      return state;
  }
};
