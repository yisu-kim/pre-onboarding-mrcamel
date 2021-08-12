/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { LOCAL_STORAGE } from "utils/constants";
import { Row, Col, Typography, Button } from "antd";
import { ProductListContainer } from "./ProductListPageStyle";
import { UserOutlined } from "@ant-design/icons";
import Product from "components/Product";

const { Title } = Typography;

export default class ProductListPage extends Component {
  state = {
    datas: [],
  };

  getInterestList = () => {
    this.setState({
      datas: LOCAL_STORAGE.get("interestList").map((itemId) => ({
        id: itemId,
      })),
    });
  };

  goRecentListPage = () => {
    this.props.history.push("/recent-list");
  };

  componentDidMount() {
    this.getInterestList();
  }

  render() {
    const { datas } = this.state;

    return (
      <div>
        <ProductListContainer>
          <Row gutter={[16, 16]} type="flex">
            <Col span={16}>
              <Title>상품 목록</Title>
            </Col>

            <Col span={8} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<UserOutlined />}
                onClick={this.goRecentListPage}
              >
                {" "}
                최근 본 상품 목록
              </Button>
            </Col>
          </Row>

          <Product productList={datas} />
        </ProductListContainer>
      </div>
    );
  }
}
