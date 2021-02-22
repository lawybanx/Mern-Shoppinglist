import * as actions from './actionTypes';
import axios from 'axios';

export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/items');

    dispatch({
      type: actions.GET_ITEMS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'ITEM_ERROR',
      payload: err.response.data.error,
    });
  }
};

export const addItem = (item) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/items', item, config);
    dispatch({
      type: actions.ADD_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error,
    });
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/items/${id}`);
    dispatch({
      type: actions.DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error,
    });
  }
};
