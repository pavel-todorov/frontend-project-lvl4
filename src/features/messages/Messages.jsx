import React from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';

import { messageSending, messageSent } from './slice.js'
import { newMessage } from '../../slice.js'
import { current } from '@reduxjs/toolkit';

const Messages = (props) => {
  const dispatch = useDispatch();
  const { socket, messages, currentChannelId } = props;
  const { isSending } = useSelector((state) => state.messages);

  console.log(`Messages: isSending=${isSending}, socket=${socket}`);

  socket.on('newMessage', (data) => {
    console.log(`Messages::didMount::newMessage: ${JSON.stringify(data)}`);
    dispatch(newMessage(data));
  });

  const renderMessages = (messages) => {
    return messages
//      .filter((item) => (item.channelId == currentChannelId))
      .map((item) => (
        <div key={item.id}>
          <b>{item.user}</b>: {item.message}
        </div>));
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(`Messages::onSubmit(${JSON.stringify(values)})`);
    const authInfo = JSON.parse(window.localStorage.getItem('authInfo'));
    console.log(`Messages::onSubmit: authInfo=${JSON.stringify(authInfo)}`);
    dispatch(messageSending());
    const newMessage = { message: values.message, channelId: currentChannelId, user: authInfo.username };
    console.log(`Messages::onSubmit: newMessage=${JSON.stringify(newMessage)}`);
    socket.emit('newMessage', newMessage, (data) => {
      console.log(`Messages::onSubmit::response: ${JSON.stringify(data)}`);
      resetForm({});
      dispatch(messageSent());
   });
  };

  return (
    <React.Fragment>
      <h5>Messages</h5>
      <div style={{backgroundColor: "lightgray"}} className={"h-75"}>
        {renderMessages(messages)}
      </div>
      <hr />
      <Formik 
        initialValues={{ message:"" }}
        onSubmit={onSubmit}>
        {({ values,
          handleChange,
          handleSubmit }) => (
        <Form>
          <Form.Row>
            <Col sm="10" md="10" xl="10" lg="10">
              <FormControl
                name="message"
                value={values.message || ''}
                className="mb-2"
                id="messagesMessage"
                onChange={handleChange}
                required
                placeholder="Message"/>
            </Col>
            <Col sm="2" md="2" xl="2" lg="2">
              <Button type="submit" className="mb-2" onClick={handleSubmit} disabled={values.message === "" || isSending}>Send</Button>
            </Col>
          </Form.Row>
        </Form>)}
      </Formik>
    </React.Fragment>
  );
};

export default Messages;