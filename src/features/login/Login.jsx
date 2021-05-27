import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Form, FormGroup, FormLabel, FormControl, Button, Modal, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { setModalState } from './slice.js';
import { setLoggedState } from '../../slice.js';

const Login = (props) => {
  const { showModal, modalMessage } = useSelector((state) => {
    console.log(`Login: ENTER with state ${JSON.stringify(state)}`);
    return state.login
  });

  const { i18nFunction } = props;
  // console.log(`Login: ${typeof i18nFunction}`);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(`Login: showModal=${showModal}, modalMessage=${modalMessage}`);

  const validationSchema = yup.object().shape({
    login: yup.string()
      .min(3, i18nFunction('help_login'))
      .max(20, i18nFunction('help_login'))
      .required(),
    password: yup.string()
      // .min(1, i18nFunction('help_password'))
      .required(),
  });

  const onSubmit = async (values, { resetForm, setStatus }) => {
    // console.log(`Login::onSubmit: values = ${JSON.stringify(values)}`);

    setStatus(undefined);
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
    if (res.status !== 201) {
      console.log(`Login failed, status = ${res.status}`);
      setStatus(i18nFunction('warn_bad_login_or_password'));
      // dispatch(setModalState({ message: i18nFunction('warn_bad_login_or_password'), showModal: true }));
      return;
    }

    window.localStorage.setItem('authInfo', JSON.stringify(res.data));
    dispatch(setLoggedState({ isLoggedIn: true }));
    resetForm()

    history.push('/');
  };

  const renderModal = (showModal, modalMessage, setModalState) => {
    console.log(`Login::renderModal(${showModal}, ${modalMessage})`);
    const onHide = () => dispatch(setModalState({ showModal: false }));

    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>Info</Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Row className="justify-content-md-center justify-content-xl-center justify-content-sm-center justify-content-lg-center">
        <Col md="4" sm="4" xl="4" lg="4">
          <h5>{i18nFunction('action_login')}</h5>
          <Formik 
            initialValues={{ login:"", password:""}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({values,
              errors,
              status,
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
                  <FormGroup controlId="passwordGroup">
                    <FormLabel>{i18nFunction('request_password')}</FormLabel>
                    <FormControl
                      name="password"
                      type="password"
                      placeholder={i18nFunction('request_password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && errors.password && status} 
                      controlId="loginPassword"/>
                    { status ? <div style={{color: "red"}}>{status}</div> : <div style={{color: "red"}}>{errors.password}</div> }
                  </FormGroup>
                  <Button variant="primary" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                    {i18nFunction('action_login')}
                  </Button>
                </Form>
              )}
          </Formik>
          <br />
          <Link to="/signup">{i18nFunction('title_registration')}</Link>
        </Col>
      </Row>
      {renderModal(showModal, modalMessage, setModalState)}
    </React.Fragment>
  ); 
}

// export default connect(mapStateToProps, actionCreators)(Login);
export default Login;
