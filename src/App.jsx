import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import Channels from './features/channels/Channels';

const mapStateToProps = (state) => {
  return state;
};

class App extends React.Component {
  render() {
    const { data, i18nFunction } = this.props;
    console.log(`App::render: data=${JSON.stringify(data)}`);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Channels data={data.channels} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);