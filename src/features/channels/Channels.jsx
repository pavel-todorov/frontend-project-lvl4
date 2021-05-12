import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { channelsLoading, channelsReceived, setCurrentChannel, newChannel } from '../../slice.js'
import { showAskNameModal } from './slice.js'
import { Form, Row, Col, Modal, Button, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';

const Channels = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { channels, channelsLoadingState, currentChannelId, socket } = props;
  console.log(`Channels: channels=${JSON.stringify(channels)}, loading=${channelsLoadingState}, currentChannelId=${currentChannelId}`);
  const authInfoString = window.localStorage.getItem('authInfo');
  if (authInfoString === null) {
    history.push('/login');
    return null;
  }
  const token = JSON.parse(authInfoString).token;

  const fetchChannels = async (token, dispatch) => {
    dispatch(channelsLoading());
    const dataString = window.localStorage.getItem('channels');
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      dispatch(channelsReceived(data))
      return;
    }
    let channelsRequestResult;
    try {
      channelsRequestResult = await axios({
        url: '/api/v1/data',
        method: 'get',
        headers: {'Authorization': `Bearer ${token}` },
      });
    } catch(err) {
      channelsRequestResult = err.response;
    }
    console.log(`Channels::fetchChannels: response=${JSON.stringify(channelsRequestResult)}`);
    if (channelsRequestResult.status === 200) {
      // console.log(`Channels::fetchChannels dispatch data: ${JSON.stringify(channelsRequestResult.data)}`);
      window.localStorage.setItem('channels', JSON.stringify(channelsRequestResult.data));
      return dispatch(channelsReceived(channelsRequestResult.data));
    }
    return dispatch(channelsReceived([]));
  };

  const handleChannelPress = (id) => (e) => {
    e.preventDefault();
    console.log(`Channels::handleChannelPress(${id}): ENTER`);
    dispatch(setCurrentChannel(id));
  };

  const renderChannels = (channels, currentChannelId) => {
    console.log(`Channels::renderChannels(${JSON.stringify(channels)},${currentChannelId})`);
    if (channels.length === 0) {
      return null;
    }
    return (
      <div>
        {
          channels.map((channel) => {
            if (channel.id === currentChannelId)
              return (<p key={channel.id}><b>{channel.name}</b></p>);
            else
              return (<p><a key={channel.id} className="link-secondary" onClick={handleChannelPress(channel.id)}>{channel.name}</a></p>);
          })
        }
      </div>
    );
  };

  const onAddChannel = (e) => {
    e.preventDefault();
    console.log('Channels::onAddChannel ENTER');
    dispatch(showAskNameModal({ question: 'Channel name', isShown: true, tag: 'newChannel' }));
  };

  const onSubmit = (values) => {
    console.log(`Channels::onSubmit(${JSON.stringify(values)})`);
    const dispatcher = {
      newChannel: () => {
        console.log('Channels::onSubmit::newChannel: ENTER');
        socket.emit('newChannel', { name: values.text }, (data) => {
          console.log(`Channels::onSubmit::response: ${JSON.stringify(data)}`);
          dispatch(newChannel(data.data));
        });
      },
    };
    if (dispatcher[values.tag] !== undefined) {
      dispatcher[values.tag]();
    }
    dispatch(showAskNameModal({ question: '', isShown: false, tag: ''}));
};

  const { askNameModal } = useSelector((state) => {
    console.log(`Channles::render: state=${JSON.stringify(state.channels)}`);
    return state.channels
  });
  // console.log(`Channels: authInfo="${authInfoString}"`);
  fetchChannels(token, dispatch);

  return (
    <React.Fragment>
      <Row>
        <Col><h5>Channels</h5></Col>
        <Col sm={1} md={1} lg={1} xl={1}><a className="link-secondary"  onClick={onAddChannel}>+</a></Col>
      </Row>
      {renderChannels(channels, currentChannelId)}
      <Modal
        show={askNameModal.isShown}
        onHide={() => dispatch(showAskNameModal({ question: '', isShown: false, tag: '' }))}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
          <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {askNameModal.question}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik 
            initialValues={{ text:"", tag: askNameModal.tag }}
            onSubmit={onSubmit}>
            {({ values,
              handleChange,
              handleSubmit }) => (
            <Form>
              <FormControl
                name="text"
                value={values.text || ''}
                className="mb-2"
                id="channelsModalMessage"
                onChange={handleChange}
                required/>
              <Button type="submit" className="mb-2" onClick={handleSubmit} disabled={values.text === ""}>Submit</Button>
            </Form>)}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Channels;