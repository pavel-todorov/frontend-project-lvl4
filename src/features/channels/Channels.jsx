import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';

import routes from '../../routes.js'
import { channelsLoading, channelsReceived } from './slice.js'

const Channels = () => {
  const fetchChannels = async (token, dispatch) => {
    dispatch(channelsLoading());
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
    console.log(`Channels::response: ${JSON.stringify(channelsRequestResult)}`);
    if (channelsRequestResult.status === 200) {
      console.log(`Channels: dispatch data: ${JSON.stringify(channelsRequestResult.data)}`);
      return dispatch(channelsReceived(channelsRequestResult.data));
    }
    return dispatch(channelsReceived([]));
  };

  const renderChannels = (channels) => {
    console.log(`Channels::renderChannels(${JSON.stringify(channels)})`);
    if (channels.length === 0) {
      return null;
    }
    return (
      <div>
        {
          channels.map((channel) => {
            return (<div key={_.uniqueId()}>{channel.name}</div>);
          })
        }
      </div>
    );
  };

  const dispatch = useDispatch();
  const token = JSON.parse(window.localStorage.getItem('authInfo')).token;
  // console.log(`Channels: authInfo="${JSON.stringify(window.localStorage.getItem('authInfo'))}"`);
  fetchChannels(token, dispatch);

  const { channels } = useSelector((state) => state.channels);
  console.log(`Channels::render: props = ${JSON.stringify(channels)}`);
  return (
    <React.Fragment>
      <h5>Channels</h5>
      {renderChannels(channels)}
    </React.Fragment>
  );
};

export default Channels;