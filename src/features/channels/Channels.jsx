import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { channelsLoading, channelsReceived, setCurrentChannel, newChannel, renameChannel } from '../../slice.js'
import { showAskNameModal } from './slice.js'
import { Form, Row, Col, Modal, Button, FormControl, SplitButton, Dropdown, Container } from 'react-bootstrap';
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

  const handleDropdownSelect = (channelId) => (e) => {
    console.log(`Channels::handleDropdownSelect(${channelId}, ${e}): ENTER`);
    const behaviorCase = e.toLowerCase();
    const behavior = {
      delete: () => {
        //@todo
      },
      rename: () => {
        dispatch(showAskNameModal({ question: 'Enter new channel name', isShown: true, tag: behaviorCase }));
      },
    };
    if (behavior[behaviorCase] !== undefined) {
      behavior[behaviorCase]();
    }
  };

  const renderChannels = (channels, currentChannelId) => {
    console.log(`Channels::renderChannels(${JSON.stringify(channels)},${currentChannelId})`);
    if (channels.length === 0) {
      return null;
    }
    return (
      <Container
        fluid={true}>
        {
          channels.map((channel) => {
            if (channel.id === currentChannelId)
              return (
                <SplitButton
                  style={{ width: '100%', margin: '10px 0px'}}
                  key={channel.id}
                  variant="primary"
                  title={channel.name}
                  onSelect={handleDropdownSelect(channel.id)}>
                    {channel.removable ? (<Dropdown.Item key="1" eventKey="Delete" >Delete</Dropdown.Item>) : null}
                    <Dropdown.Item key="2" eventKey="Rename">Rename</Dropdown.Item>
                </SplitButton>
              );
            else
              return (
                <Button
                  block
                  variant="light"
                  key={channel.id}
                  onClick={handleChannelPress(channel.id)}>
                    {channel.name}
                </Button>
              );
          })
        }
      </Container>
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
          console.log(`Channels::onSubmit::newChannel::response: ${JSON.stringify(data)}`);
          dispatch(newChannel(data.data));
        });
      },
      rename: () => {
        console.log('Channels::onSubmit::renameChannel: ENTER');
        const info = { id: currentChannelId, name: values.text, removable: true };
        socket.emit('renameChannel', info, (data) => {
          console.log(`Channels::onSubmit::rename::response: ${JSON.stringify(data)}`);
          dispatch(renameChannel(info));
        })
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
                controlId="channelsModalMessage"
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