/* eslint react/jsx-fragments: ["off"] */
/* eslint react/jsx-closing-bracket-location: ["off"] */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Channels from './features/channels/Channels';
import Messages from './features/messages/Messages';

import { setLoggedState } from './slice';

const App = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { socket, i18nFunction } = props;

  const {
    isLoggedIn, channels, messages, channelsLoadingState, currentChannelId,
  } = useSelector((state) => {
    console.log(`App::render: state=${JSON.stringify(state.app)}`);
    return state.app;
  });

  const authInfo = window.localStorage.getItem('authInfo');
  console.log(`App::render: authInfo=${JSON.stringify(authInfo)}`);
  if (authInfo === null) {
    history.push('/login');
    dispatch(setLoggedState({ isLoggedIn: false }));
  } else if (!isLoggedIn) {
    dispatch(setLoggedState({ isLoggedIn: true }));
  }

  return (
    <Fragment>
      <Row className="h-100">
        <Col sm={3} md={3} lg={3} xl={3}>
          <Channels
            socket={socket}
            channels={channels}
            channelsLoadingState={channelsLoadingState}
            currentChannelId={currentChannelId}
            i18nFunction={i18nFunction} />
        </Col>
        <Col sm={9} md={9} lg={9} xl={9}>
          <Messages
            socket={socket}
            messages={messages.filter((message) => (message.channelId === currentChannelId))}
            currentChannelId={currentChannelId}
            i18nFunction={i18nFunction} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default App;
