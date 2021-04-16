import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import Channels from './features/channels/Channels';

const mapStateToProps = (state) => {
  return state;
};

class App extends React.Component {
  render() {
    console.log(`App::render: props=${JSON.stringify(this.props)}`);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Channels />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);