import axios from 'axios';
import * as actions from './actionTypes';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => async dispatch => {
  try {
    dispatch(setItemsLoading());

    const res = await axios.get('/api/items');

    dispatch({
      type: actions.GET_ITEMS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addItem = item => async (dispatch, getState) => {
  try {
    const res = await axios.post('/api/items', item, tokenConfig(getState));
    dispatch({
      type: actions.ADD_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: actions.AUTH_ERROR,
    });
  }
};

export const deleteItem = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({
      type: actions.DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: actions.AUTH_ERROR,
    });
  }
};

export const setItemsLoading = () => {
  return { type: actions.ITEMS_LOADING };
};
