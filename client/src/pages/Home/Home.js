import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { Col, InputGroup, Button, ButtonGroup, Modal, Dropdown, DropdownButton, Alert } from 'react-bootstrap'
import { addExpense } from '../../store/actions/myExpenseActions';
// import { addCategory } from '../../store/actions/categoryAction';
import { expenseFormSchema, categoryFormSchema } from './validation';
import Layout from '../../layout/Layout';
import MyExpensesList from '../../components/MyExpenseList/MyExpenseList';
import './styles.css';

const Home = ({ addExpense, auth, expense: { expenses } }) => {

  const [categoryVal, setCategory] = React.useState('all');
  const [toggleAddExpense, setToggleState] = useState(false);

  const showAddExpense = () => {
    setToggleState(true);
  };


  const hideAddExpense = () => {
    setToggleState(false);
  };

  const [expenseTitleValue,setExpenseTitleValue]=useState("");
  const [amountValue,setAmountValue]=useState(1);
  const [categoryValue,setCategoryValue]=useState("Select Category");
  const [descriptionValue,setDescriptionValue]=useState("");

  function dropdownEvent(event){
    setCategoryValue(event);
  }

  const isSubmiting1 = expenses.some((m) => m.id === 0);
  const isSubmiting2 = expenses.some((m) => m.id === 0);

  return (
    <Layout>
      <div className="home-page">
        {!auth.isAuthenticated ? (
          <div>
            <h1>Welcome!!</h1>
            <p>
              <Link className="bold" to="/login">
                Log in
              </Link>{' '}
              or{' '}
              <Link className="bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        ) : (
          <>
	            <div>
                    <div className="add-expense-div">
                    <Button type="button" className="add-expense-btn" size="sm" onClick={showAddExpense} variant="outline-primary">Add Expense</Button>{' '}
                    </div>
                    {/* <AddExpenseForm isShowing={toggleAddExpense} /> */}
                    <div>
                      
                          <Modal scrollable={true} className="my-modal" animation={true} show={toggleAddExpense} onHide={hideAddExpense}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add Expense</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div className="row">
        <div className="col-lg-12">
          <Formik
            // validate={(values) => {
            //   let errors = {};
              
            //   if (values.title === "") {
            //     errors.title = "Title is required";
            //   } else if (values.title.length < 5) {
            //     errors.password = "Title must be 5 characters at minimum";
            //   }
            //   return errors;
            // }}
            validationSchema={expenseFormSchema}
            initialValues={{ expenseTitle: "", amount: "100", thumbnail: "", category: "house-hold", description: "" }}
            
            onSubmit={(values, actions) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));

                const newExpenseData = {
                  expenseTitle: values.expenseTitle,
                  category: values.category,
                  amount: values.amount,
                  description: values.description,
                };
                // alert(JSON.stringify(newExpenseData, null, 2));

                addExpense(newExpenseData);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="expenseTitle">Title</label>
                  <Field
                    type="text"
                    name="expenseTitle"
                    placeholder="Enter Title"
                    className={`form-control ${
                      touched.expenseTitle && errors.expenseTitle ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="expenseTitle"
                    className="invalid-feedback"
                  />
                </div>

                <div className="row">

                <div className="form-group col">
                <InputGroup.Text>₹</InputGroup.Text>
                  <label htmlFor="amount">Amount</label>
                  <Field
                    type="number"
                    name="amount"
                    placeholder="Enter Amount in Rs."
                    className={`form-control ${
                      touched.amount && errors.amount ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="amount"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group col">
                  <label htmlFor="category">Category</label>
                  <Field
                    as="select"
                    name="category"
                    placeholder="Enter Category"
                    className={`form-control ${
                      touched.category && errors.category ? "is-invalid" : ""
                    }`}
                  >
                    <option value="House-hold">House-hold</option>
                    <option value="Rent">Rent</option>
                    <option value="Personal">Personal</option>
                    <option value="Taxes">Taxes</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Clothes">Clothes</option>

                  </Field>
                  <ErrorMessage
                    component="div"
                    name="category"
                    className="invalid-feedback"
                  />
                </div>

                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    component="textarea"
                    rows="4"
                    name="description"
                    placeholder="Enter Description"
                    className={`form-control ${
                      touched.description && errors.description ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="description"
                    className="invalid-feedback"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmiting1}
                >
                  {/* Submit */}
                  {isSubmiting1 ? "Please wait..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
                            </Modal.Body>
                          </Modal>
                       
                    </div>
                  </div>
	<div>
    <div className="dropdown">
  <DropdownButton
  onSelect={dropdownEvent}
        as={ButtonGroup}
        key={'Primary'}
        id={'Primary'}
        variant={'Primary'}
        title={categoryVal}
      >
        <Dropdown.Item eventKey="all">All</Dropdown.Item>
        <Dropdown.Item eventKey="House hold">House hold</Dropdown.Item>
        <Dropdown.Item eventKey="Rent">Rent</Dropdown.Item>
        <Dropdown.Item eventKey="Personal" >Personal</Dropdown.Item>
        <Dropdown.Item eventKey="Taxes">Taxes</Dropdown.Item>
        <Dropdown.Item eventKey="Car Loan">Car Loan</Dropdown.Item>
        <Dropdown.Item eventKey="Insurance">Insurance</Dropdown.Item>
        <Dropdown.Item eventKey="Clothes">Clothes</Dropdown.Item>
      </DropdownButton>

      </div>
           <MyExpensesList category={categoryVal}/>
	</div>
	</>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  expense: state.expense,
});

export default compose(connect(mapStateToProps, {addExpense}))(Home);
