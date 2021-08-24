import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Button, Spinner } from 'react-bootstrap';
import { deleteExpense, clearExpenseError } from '../../store/actions/myExpenseActions';
import './styles.css';

const MyExpense = ({ expense, auth, deleteExpense, clearExpenseError}) => {

    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteExpense(id);
    };

    return (
        <div className="my-expense">
            {expense.isLoading ? (
                        <Spinner animation="border" />

            ) : (
                <div className="card">
        <div className="card-body">
            <h4>{expense.expenseTitle}</h4>
	    <h5>{"Category: " + expense.category}</h5>
	    <h6>{"Amount: " + expense.amount}</h6>
            <p>{"Description: " + expense.description}</p>
            <div>
            {auth.isAuthenticated && (auth.me.id === expense.user.id) && (
                <>
                {
                    <>
                <a onClick={(e) => handleDelete(e, expense.id)}>Delete</a>
                    </>
                }
                </>
            )}
            </div>
        </div>
    </div>        
  )
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteExpense, clearExpenseError })(MyExpense);