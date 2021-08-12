import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import { ROUTES } from "utils/constants/constants";

class Header extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  render() {
    return (
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <Link to={ROUTES.PRODUCT}>
            <img alt="logo" src="/logo.png" />
          </Link>
        </Col>
        <Col>{this.props.children}</Col>
      </Row>
    );
  }
}

export default Header;
