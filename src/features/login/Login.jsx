import React from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { setLoggedState } from '../../actions.js'
import { setModalState } from './actions.js'

const mapStateToProps = (state) => {
  const { login } = state;
  return login;
}

const actionCreators = {
  setLoggedState,
  setModalState,
};

const Login = (props) => {
  console.log(`Login(${JSON.stringify(props)}): ENTER`);

  const { i18nFunction, setLoggedState, setModalState, showModal, modalMessage } = props;
  const history = useHistory();
  console.log(`Login: showModal=${showModal}, modalMessage=${modalMessage}`);

  const validationSchema = yup.object().shape({
    login: yup.string()
      .min(3, i18nFunction('help_login'))
      .max(20, i18nFunction('help_login'))
      .required(),
    password: yup.string()
      .min(5, i18nFunction('help_password'))
      .required(),
  });

  const onSubmit = async (values) => {
    console.log(`Login::onSubmit: values = ${JSON.stringify(values)}`);

    let res;
    try {
      res = await axios({
        url: '/api/v1/login',
        method: 'post',
        data: { username: values.login, password: values.password },
      });
    } catch(err) {
      console.log(`Login failed. ${err}`);
      res = err.response;
    }

    console.log(`Request result: ${JSON.stringify(res)}`);
    if (res.status !== 200) {
      console.log(`Login failed, status = ${res.status}`);
      setModalState({ message: `Login failed, status = ${res.status}`, showModal: true });
      return;
    }

    window.localStorage.setItem('authInfo', res.data);
    setLoggedState({ isLoggedIn: true });

    history.push('/');
  };

  const renderModal = (showModal, modalMessage, setModalState) => {
    console.log(`Login::renderModal(${showModal}, ${modalMessage})`);
    const onHide = () => setModalState({ showModal: false });

    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>Info</Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <h5>{i18nFunction('title_registration')}</h5>
      <Formik 
        initialValues={{ login:"", password:""}}
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
                <FormLabel>{i18nFunction('request_login')}</FormLabel>
                <FormControl
                  name="login"
                  type="text"
                  placeholder={i18nFunction('request_login')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login} 
                  isInvalid={touched.login && errors.login} />
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
                  isInvalid={touched.password && errors.password} />
                <div style={{color: "red"}}>{errors.password}</div>
              </FormGroup>
              <Button variant="primary" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                {i18nFunction('action_login')}
              </Button>
            </Form>
          )}
      </Formik>
      {renderModal(showModal, modalMessage, setModalState)}
    </React.Fragment>
  ); 
}

export default connect(mapStateToProps, actionCreators)(Login);
