import { v4 as uuidv4 } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';

const initialState = {
  items: [
    {
      id: uuidv4(),
      name: 'Eggs',
    },
    {
      id: uuidv4(),
      name: 'Steak',
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS:
      return { ...state, items: payload };

    case ADD_ITEM:
      return { ...state, items: [payload, ...state.items] };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };

    default:
      return state;
  }
};
