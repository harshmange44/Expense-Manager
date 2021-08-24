import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_BY_ID_FAIL,
  GET_CATEGORY_BY_ID_LOADING,
  GET_CATEGORY_BY_ID_SUCCESS,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
} from '../types';

export const getCategories = (category) => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORY_LOADING,
    payload: {category},
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/category/${category}`, options);

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: { categories: response.data.categories },
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getCategoryById = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORY_BY_ID_LOADING,
    payload: {id},
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/category/${id}`, options);

    dispatch({
      type: GET_CATEGORY_BY_ID_SUCCESS,
      payload: { category: response.data.category },
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_BY_ID_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addCategory = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_CATEGORY_LOADING,
    payload: { me: { ...getState().auth.me } },
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/category', formData, options);

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: { expense: response.data.expense },
    });
  } catch (err) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
