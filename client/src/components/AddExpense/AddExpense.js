import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik, useFormik } from 'formik';
import {Form, Col, InputGroup, Button, Modal} from 'react-bootstrap'
import { addCourse } from '../../store/actions/courseActions';
import { courseFormSchema } from './validation';
import './styles.css';
// const { Formik } = formik;
const AddCourseForm = (isShowing, { addCourse}) => {
    
    const [show, setShow] = useState(isShowing);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const isSubmiting = courses.some((m) => m.id === 0);
  
    return (
      
        <div>
        <Formik
        validationSchema={courseFormSchema}
        onSubmit={console.log}
        initialValues={{
          courseTitle: '',
          category: '',
          description: '',
          state: '',
          zip: '',
          terms: false,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  name="courseTitle"
                  value={values.courseTitle}
                  onChange={handleChange}
                  isValid={touched.courseTitle && !errors.courseTitle}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Duration in hr(s)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  isValid={touched.duration && !errors.duration}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikcategory">
                <Form.Label>Category</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    aria-describedby="inputGroupPrepend"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
  
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
          </Modal.Body>
        </Modal>
        )}
      </Formik>
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    // course: state.course,
    isShowing: state.isShowing
  });
  
export default connect(mapStateToProps, { addCourse })(AddCourseForm);