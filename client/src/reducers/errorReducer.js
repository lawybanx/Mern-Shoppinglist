import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return {
        msg: payload.msg,
        status: payload.status,
        id: payload.id,
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
