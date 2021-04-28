import React from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';

const Messages = () => {
  const onSubmit = (values) => {
    console.log(`Messages::onSubmit(${JSON.stringify(values)})`);
  };

  return (
    <React.Fragment>
      <h5>Messages</h5>
      <div style={{backgroundColor: "lightgray"}} className={"h-75"}></div>
      <hr />
      <Formik 
        initialValues={{ message:"" }}
        onSubmit={onSubmit}>
        {({values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting }) => (
        <Form>
          <Form.Row>
            <Col sm="10" md="10" xl="10" lg="10">
              <FormControl
                name="message"
                className="mb-2"
                id="inlineFormInput"
                onChange={handleChange}
                required
                placeholder="Message"/>
            </Col>
            <Col sm="2" md="2" xl="2" lg="2">
              <Button type="submit" className="mb-2" onClick={handleSubmit} disabled={values.message === ""}>Send</Button>
            </Col>
          </Form.Row>
        </Form>)}
      </Formik>
    </React.Fragment>
  );
};

export default Messages;