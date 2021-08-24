import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_MY_EXPENSES_LOADING,
  GET_MY_EXPENSES_SUCCESS,
  GET_MY_EXPENSES_FAIL,
  GET_MY_EXPENSES_BY_USER_ID_FAIL,
  GET_MY_EXPENSES_BY_USER_ID_LOADING,
  GET_MY_EXPENSES_BY_USER_ID_SUCCESS,
  ADD_MY_EXPENSE_LOADING,
  ADD_MY_EXPENSE_SUCCESS,
  ADD_MY_EXPENSE_FAIL,
  DELETE_MY_EXPENSE_LOADING,
  DELETE_MY_EXPENSE_SUCCESS,
  DELETE_MY_EXPENSE_FAIL,
  EDIT_MY_EXPENSE_LOADING,
  EDIT_MY_EXPENSE_SUCCESS,
  EDIT_MY_EXPENSE_FAIL,
  CLEAR_MY_EXPENSE_ERROR,
} from '../types';

export const getExpenses = (category) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_EXPENSES_LOADING,
    payload: {category},
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/expenses/${category}`, options);

    dispatch({
      type: GET_MY_EXPENSES_SUCCESS,
      payload: { expenses: response.data.expenses },
    });
  } catch (err) {
    dispatch({
      type: GET_MY_EXPENSES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getExpensesByUserId = (id, category) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_EXPENSES_BY_USER_ID_LOADING,
    payload: {id},
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/expenses/user/${id}`, options);

    var filteredArr = response.data.expenses.filter(x=> x.category === category
    );
    dispatch({
      type: GET_MY_EXPENSES_BY_USER_ID_SUCCESS,
      payload: { expenses: filteredArr },
    });
  } catch (err) {
    dispatch({
      type: GET_MY_EXPENSES_BY_USER_ID_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addExpense = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_MY_EXPENSE_LOADING,
    payload: { me: { ...getState().auth.me } },
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/expenses', formData, options);

    dispatch({
      type: ADD_MY_EXPENSE_SUCCESS,
      payload: { expense: response.data.expense },
    });
  } catch (err) {
    dispatch({
      type: ADD_MY_EXPENSE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteExpense = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_MY_EXPENSE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/expenses/${id}`, options);

    dispatch({
      type: DELETE_MY_EXPENSE_SUCCESS,
      payload: { expense: response.data.expense },
    });
  } catch (err) {
    dispatch({
      type: DELETE_MY_EXPENSE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editExpense = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_MY_EXPENSE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/expenses/${id}`, formData, options);

    dispatch({
      type: EDIT_MY_EXPENSE_SUCCESS,
      payload: { expense: response.data.expense },
    });
  } catch (err) {
    dispatch({
      type: EDIT_MY_EXPENSE_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

export const clearExpenseError = (id) => ({
  type: CLEAR_MY_EXPENSE_ERROR,
  payload: { id },
});
