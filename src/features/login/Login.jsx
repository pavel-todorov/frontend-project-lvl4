import React from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { setLoggedState } from '../../actions.js'

const mapStateToProps = (state) => {
  return state;
}

const actionCreators = {
  setLoggedState,
};

const Login = (props) => {
  const { i18nFunction, setLoggedState } = props;
  const history = useHistory();

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

    const res = await axios({
      url: '/api/v1/login',
      method: 'post',
      data: { username: values.login, password: values.password },
    });

    console.log(`Request result: ${JSON.stringify(res)}`);
    if (res.status !== 200) {
      console.log(`Login failed, status = ${res.status}`);
      return;
    }

    window.localStorage.setItem('authInfo', res.data);
    setLoggedState({ isLoggedIn: true });

    history.push('/');
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
    </React.Fragment>
  ); 
}

export default connect(mapStateToProps, actionCreators)(Login);
