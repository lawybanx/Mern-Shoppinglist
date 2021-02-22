import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_ERROR,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  errors: [],
};

const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS:
      return { ...state, items: payload };

    case ADD_ITEM:
      return { ...state, items: [payload, ...state.items] };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload),
      };

    case ITEM_ERROR:
      return { ...state, errors: [payload, ...state.errors] };
    default:
      return state;
  }
};

export default itemReducer;
