import React from 'react';

import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import Channels from './features/channels/Channels';

import { setLoggedState } from './actions.js'

const mapStateToProps = (state) => {
  return state.app;
};

const actionCreators = {
  setLoggedState,
};

const App  = (props) => {
  const history = useHistory();
  const { setLoggedState, isLoggedIn } = props;
  console.log(`App::render: props=${JSON.stringify(props)}`);
  const authInfo = window.localStorage.getItem('authInfo');
  console.log(`App::render: authInfo=${JSON.stringify(authInfo)}`);
  if (authInfo === null) {
    history.push('/login');
  } else if (!isLoggedIn) {
    setLoggedState({ isLoggedIn: true });
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Channels />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, actionCreators)(App);