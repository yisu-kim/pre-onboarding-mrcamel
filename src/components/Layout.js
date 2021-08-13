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
    ]),
  };

  render() {
    return (
      <>
        <Row gutter={[0, 16]} justify="center">
          <Col span={20} md={18} lg={16}>
            <Header menu={this.props.menu}></Header>
          </Col>

          <Col span={20} md={18} lg={16}>
            <div>{this.props.children}</div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Layout;
