import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return state;
};

class Header extends React.Component {
  render() {
    const { i18nFunction } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col sm="9" lg="9" xs="9">
            <Link to="/"><b>{i18nFunction('title_main')}</b></Link>
          </Col>
          <Col sm="1" lg="1" xs="1">
            <Link to="/login">{i18nFunction('title_registration')}</Link>
          </Col>
        </Row>
        <hr />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Header);