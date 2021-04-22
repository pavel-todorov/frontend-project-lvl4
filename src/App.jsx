import React from 'react';

import { useSelector, useDispatch, connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import Channels from './features/channels/Channels';

import { setLoggedState } from './slice';
// import { setLoggedState } from './actions.js'

// const mapStateToProps = (state) => {
//   return state.app;
// };

// const actionCreators = {
//   setLoggedState,
// };

const App  = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { setLoggedState, isLoggedIn } = props;
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  console.log(`App::render: isLoggedIn=${isLoggedIn}`);
  const authInfo = window.localStorage.getItem('authInfo');
  console.log(`App::render: authInfo=${JSON.stringify(authInfo)}`);
  if (authInfo === null) {
    history.push('/login');
  } else if (!isLoggedIn) {
    dispatch(setLoggedState({ isLoggedIn: true }));
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

// export default connect(mapStateToProps, actionCreators)(App);
export default App;