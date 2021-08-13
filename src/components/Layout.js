import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import Header from "components/Header";

class Layout extends Component {
  static propTypes = {
    menu: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.node,
    ]),
  };

  render() {
    return (
      <>
        <Row gutter={[0, 16]} justify="center">
          <Col xs={22} sm={20} md={18} xl={16}>
            <Header menu={this.props.menu}></Header>
          </Col>

          <Col xs={22} sm={20} md={18} xl={16}>
            <div>{this.props.children}</div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Layout;
