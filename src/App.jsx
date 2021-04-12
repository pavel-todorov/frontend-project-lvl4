import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import Channels from './features/channels/Channels';

const mapStateToProps = (state) => {
  return state;
};

class App extends React.Component {
  render() {
    const { data } = this.props;
    console.log(`App::render: data=${JSON.stringify(data)}`);
    return (
      <Row>
        <Col>
          <Channels data={data.channels} />
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps)(App);