import React, { Component } from "react";
import { Row, Typography } from "antd";
import Layout from "components/Layout";

class NotFound extends Component {
  render() {
    return (
      <Layout>
        <Row justify="center">
          <Typography.Title>NOT FOUND</Typography.Title>
        </Row>
      </Layout>
    );
  }
}

export default NotFound;
