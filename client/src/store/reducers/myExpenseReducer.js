import {
    GET_MY_EXPENSES_LOADING,
    GET_MY_EXPENSES_SUCCESS,
    GET_MY_EXPENSES_FAIL,
    GET_MY_EXPENSES_BY_USER_ID_LOADING,
    GET_MY_EXPENSES_BY_USER_ID_SUCCESS,
    GET_MY_EXPENSES_BY_USER_ID_FAIL,
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
  
  const initialState = {
    expenses: [],
    isLoading: false,
    error: null,
  };
  
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case GET_MY_EXPENSES_LOADING:
        return {
          ...state,
          isLoading: true,
        };
        case GET_MY_EXPENSES_BY_USER_ID_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case ADD_MY_EXPENSE_LOADING:
        return {
          ...state,
          expenses: [
            {
              id: 0,
              text: 'Loading...',
              isLoading: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              user: { ...payload.me },
            },
            ...state.expenses,
          ],
        };
      case DELETE_MY_EXPENSE_LOADING:
      case EDIT_MY_EXPENSE_LOADING:
        return {
          ...state,
          expenses: state.expenses.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: true };
            return m;
          }),
        };
      case GET_MY_EXPENSES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          expenses: payload.expenses,
        };
        case GET_MY_EXPENSES_BY_USER_ID_SUCCESS:
        return {
          ...state,
          isLoading: false,
          expenses: payload.expenses,
        };
      case ADD_MY_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.map((m) => {
            if (m.id === 0) return payload.expense;
            return m;
          }),
        };
      case DELETE_MY_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.filter((m) => m.id !== payload.expense.id),
        };
      case EDIT_MY_EXPENSE_SUCCESS:
        return {
          ...state,
          expenses: state.expenses.map((m) => {
            if (m.id === payload.expense.id) return payload.expense;
            return m;
          }),
        };
      case DELETE_MY_EXPENSE_FAIL:
      case EDIT_MY_EXPENSE_FAIL:
        return {
          ...state,
          error: null,
          expenses: state.expenses.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
            return m;
          }),
        };
      case GET_MY_EXPENSES_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };
        case GET_MY_EXPENSES_BY_USER_ID_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };
      case ADD_MY_EXPENSE_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
          expenses: state.expenses.filter((m) => m.id !== 0),
        };
      case CLEAR_MY_EXPENSE_ERROR:
        return {
          ...state,
          expenses: state.expenses.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: false, error: null };
            return m;
          }),
        };
      default:
        return state;
    }
  }
  