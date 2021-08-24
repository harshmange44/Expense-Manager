import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import expenseReducer from './myExpenseReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  users: usersReducer,
  expense: expenseReducer,
  category: categoryReducer,
});
