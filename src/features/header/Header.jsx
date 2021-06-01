/* eslint react/jsx-fragments: ["off"] */
import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedState } from '../../slice.js';

const Header = (props) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    console.log(`Header: ENTER with state ${JSON.stringify(state)}`);
    return state.app;
  });

  const onLogout = (e) => {
    e.preventDefault();
    console.log('Header::onLogout: ENTER');
    window.localStorage.removeItem('authInfo');
    dispatch(setLoggedState({ isLoggedIn: false }));
  };

  const renderHeader = (isUserLoggedIn, i18nFunction) => {
    if (!isUserLoggedIn) {
      return null;
    }
    return (
      <Col sm="1" lg="1" xs="1">
        <Button onClick={onLogout}>{i18nFunction('action_logout')}</Button>
      </Col>
    );
  };

  const { i18nFunction } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="9" lg="9" xs="9">
          <Link to="/"><b>{i18nFunction('title_main')}</b></Link>
        </Col>
        {renderHeader(isLoggedIn, i18nFunction)}
      </Row>
      <hr />
    </Fragment>
  );
};

export default Header;
