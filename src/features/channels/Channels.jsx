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
    console.log(`Channels::render: props = ${JSON.stringify(this.props)}`);
    const { channels } = this.props;
    return (
      <React.Fragment>
        <h5>Channels</h5>
        {this.renderChannels(channels)}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Channels);