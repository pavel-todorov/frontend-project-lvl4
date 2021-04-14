import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

class Channels extends React.Component {
  renderChannels(channels) {
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

  render() {
    const { data } = this.props;
    console.log(`Channels::render: channels = ${JSON.stringify(data)}`);
    return (
      <React.Fragment>
        <h5>Channels</h5>
        {this.renderChannels(data)}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Channels);