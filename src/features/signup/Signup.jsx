import React from 'react';
import { useHistory } from "react-router-dom";
import { Form, FormGroup, FormLabel, FormControl, Button, Modal, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const Signup = (props) => {
  const history = useHistory()
  const { i18nFunction } = props;

const validationSchema = yup.object().shape({
    login: yup.string()
      .min(3, i18nFunction('help_login'))
      .max(20, i18nFunction('help_login'))
      .required(),
      password: yup.string()
      .min(6, i18nFunction('help_password'))
      .required(),
      password2: yup.string()
      .min(6, i18nFunction('help_password'))
      .required()
      .oneOf([yup.ref('password'), null], i18nFunction('warn_password_should_be_the_same')),
  });

  const onSubmit = async (values, { resetForm }) => {
    // console.log(`Login::onSubmit: values = ${JSON.stringify(values)}`);

    let res;
    try {
      res = await axios({
        url: '/api/v1/login',
        method: 'post',
        data: { username: values.login, password: values.password },
      });
    } catch(err) {
      // console.log(`Login failed. ${err}`);
      res = err.response;
    }

    console.log(`Request result: ${JSON.stringify(res)}`);
    if (res.status !== 200) {
      console.log(`Login failed, status = ${res.status}`);
      dispatch(setModalState({ message: `Login failed, status = ${res.status}`, showModal: true }));
      return;
    }

    window.localStorage.setItem('authInfo', JSON.stringify(res.data));
    dispatch(setLoggedState({ isLoggedIn: true }));
    resetForm()

    history.push('/');
  };

  return (
    <React.Fragment>
      <Row className="justify-content-md-center justify-content-xl-center justify-content-sm-center justify-content-lg-center">
        <Col md="4" sm="4" xl="4" lg="4">
          <h5>{i18nFunction('title_registration')}</h5>
          <Formik 
            initialValues={{ login:"", password:"", password2:""}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting }) => (
                <Form>
                  <FormGroup controlId="loginGroup">
                    <FormLabel>{i18nFunction('request_nik')}</FormLabel>
                    <FormControl
                      name="login"
                      type="text"
                      placeholder={i18nFunction('request_nik')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.login} 
                      isInvalid={touched.login && errors.login} 
                      controlId="loginLogin"/>
                    <div style={{color: "red"}}>{errors.login}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{i18nFunction('request_password')}</FormLabel>
                    <FormControl
                      name="password"
                      type="password"
                      placeholder={i18nFunction('request_password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && errors.password} 
                      controlId="loginPassword"/>
                    <div style={{color: "red"}}>{errors.password}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{i18nFunction('request_confirm_password')}</FormLabel>
                    <FormControl
                      name="password2"
                      type="password"
                      placeholder={i18nFunction('request_confirm_password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password2}
                      isInvalid={touched.password2 && errors.password2} 
                      controlId="loginPassword2"/>
                    <div style={{color: "red"}}>{errors.password2}</div>
                  </FormGroup>
                  <Button variant="primary" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                    {i18nFunction('action_signin')}
                  </Button>
                </Form>
              )}
          </Formik>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Signup;
