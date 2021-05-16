import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return state;
};

class Header extends React.Component {
  renderHeader(isLoggedIn, i18nFunction) {
    if (!isLoggedIn) {
      return null;
    }
    return (
      <Col sm="1" lg="1" xs="1">
        <Link to="/login">{i18nFunction('action_login')}</Link>
      </Col>
    );
  }

  render() {
    const { app: { isLoggedIn }, i18nFunction } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col sm="9" lg="9" xs="9">
            <Link to="/"><b>{i18nFunction('title_main')}</b></Link>
          </Col>
          {this.renderHeader(isLoggedIn, i18nFunction)}
        </Row>
        <hr />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Header);