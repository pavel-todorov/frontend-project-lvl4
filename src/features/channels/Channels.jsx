import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
//   return state;
// };

const Channels = () => {
  const renderChannels = (channels) => {
    console.log(`Channels::renderChannels(${JSON.stringify(channels)})`);
    if (channels.length === 0) {
      return null;
    }
    return (
      <div>
        {
          channels.map((channel) => {
            return (<div key={channel.id}>{channel.name}</div>);
          })
        }
      </div>
    );
  }

  const channels = useSelector((state) => state.channels);
  console.log(`Channels::render: props = ${JSON.stringify(channels)}`);
  // const { channels } = this.props;
  return (
    <React.Fragment>
      <h5>Channels</h5>
      {renderChannels(channels)}
    </React.Fragment>
  );
};

export default Channels;