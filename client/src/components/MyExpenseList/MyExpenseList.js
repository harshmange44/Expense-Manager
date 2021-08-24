import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'react-bootstrap';
import MyExpense from '../MyExpense/MyExpense';
import Loader from '../Loader/Loader';

import { getExpensesByUserId } from '../../store/actions/myExpenseActions';

import './styles.css';

const MyExpensesList = ({category, getExpensesByUserId, auth, expense: { expenses, isLoading, error } }) => {
  useEffect(() => {
    getExpensesByUserId(auth.me.id, category);
  }, []);

  return (
    <div>
      <h2>My Expenses</h2>
      {error && <div className="error-center">{error}</div>}
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="my-expense-list">
                {
                expenses.map((expense, index) => {
                    return <MyExpense key={index} expense={expense} />;
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    expense: state.expense,
    auth: state.auth,
});

export default connect(mapStateToProps, { getExpensesByUserId })(MyExpensesList);