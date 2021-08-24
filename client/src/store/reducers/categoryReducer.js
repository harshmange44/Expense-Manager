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
  
  const initialState = {
    categories: [],
    isLoading: false,
    error: null,
  };
  
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case GET_CATEGORY_LOADING:
        return {
          ...state,
          isLoading: true,
        };
        case GET_CATEGORY_BY_ID_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case ADD_CATEGORY_LOADING:
        return {
          ...state,
          categories: [
            {
              id: 0,
              text: 'Loading...',
              isLoading: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              user: { ...payload.me },
            },
            ...state.categories,
          ],
        };
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          categories: payload.categories,
        };
        case GET_CATEGORY_BY_ID_SUCCESS:
        return {
          ...state,
          isLoading: false,
          categories: payload.categories,
        };
      case ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: state.categories.map((m) => {
            if (m.id === 0) return payload.category;
            return m;
          }),
        };
     
      case GET_CATEGORY_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };
        case GET_CATEGORY_BY_ID_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };
      case ADD_CATEGORY_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
          categories: state.categories.filter((m) => m.id !== 0),
        };
      default:
        return state;
    }
  }
  