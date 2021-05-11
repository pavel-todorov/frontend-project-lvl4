import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import { useSelector, useDispatch, connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import Channels from './features/channels/Channels';
import Messages from './features/messages/Messages';

import { setLoggedState } from './slice';

var socket = io();

const App  = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, channels, messages, channelsLoadingState, currentChannelId } = useSelector((state) => {
    console.log(`App::render: state=${JSON.stringify(state.app)}`);
    return state.app
  });

  const authInfo = window.localStorage.getItem('authInfo');
  console.log(`App::render: authInfo=${JSON.stringify(authInfo)}`);
  if (authInfo === null) {
    history.push('/login');
  } else if (!isLoggedIn) {
    dispatch(setLoggedState({ isLoggedIn: true }));
  }

  return (
    <React.Fragment>
        <Row className={"h-100"}>
          <Col sm={3} md={3} lg={3} xl={3}>
            <Channels channels={channels} channelsLoadingState={channelsLoadingState} currentChannelId={currentChannelId}/>
          </Col>
          <Col sm={9} md={9} lg={9} xl={9}>
            <Messages
              socket={socket}
              messages={messages.filter((message) => (message.channelId === currentChannelId))}
              currentChannelId={currentChannelId}/>
          </Col>
        </Row>
    </React.Fragment>
  );
};

// export default connect(mapStateToProps, actionCreators)(App);
export default App;