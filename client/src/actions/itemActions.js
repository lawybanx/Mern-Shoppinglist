import axios from 'axios';
import * as actions from './actionTypes';

export const getItems = () => async dispatch => {
  try {
    dispatch(setItemsLoading());

    const res = await axios.get('/api/items');

    dispatch({
      type: actions.GET_ITEMS,
      payload: res.data.data,
    });
  } catch (err) {
    // dispatch();
  }
};

export const addItem = item => async dispatch => {
  try {
    const res = await axios.post('/api/items', item);
    dispatch({
      type: actions.ADD_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    // dispatch();
  }
};

export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`/api/items/${id}`);
    dispatch({
      type: actions.DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    // dispatch();
  }
};

export const setItemsLoading = () => {
  return { type: actions.ITEMS_LOADING };
};
