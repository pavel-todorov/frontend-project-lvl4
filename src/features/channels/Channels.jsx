import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { channelsLoading, channelsReceived } from '../../slice.js'

const Channels = (props) => {
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
              return (<div key={_.uniqueId()}><b>{channel.name}</b></div>);
            else
              return (<div key={_.uniqueId()}>{channel.name}</div>);
          })
        }
      </div>
    );
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const authInfoString = window.localStorage.getItem('authInfo');
  if (authInfoString === null) {
    history.push('/login');
    return null;
  }
  const token = JSON.parse(authInfoString).token;
  const { channels, channelsLoadingState, currentChannelId } = props; //useSelector((state) => state.channels);
  console.log(`Channels: channels=${JSON.stringify(channels)}, loading=${channelsLoadingState}, currentChannelId=${currentChannelId}`);
  // console.log(`Channels: authInfo="${authInfoString}"`);
  fetchChannels(token, dispatch);

  return (
    <React.Fragment>
      <h5>Channels</h5>
      {renderChannels(channels, currentChannelId)}
    </React.Fragment>
  );
};

export default Channels;