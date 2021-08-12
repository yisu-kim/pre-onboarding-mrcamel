import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LOCAL_STORAGE } from "utils/constants";
import Product from "components/Product";
import { ProductListContainer } from "./ProductListPageStyle";

const { Title } = Typography;

class ProductListPage extends Component {
  state = {
    datas: [],
  };

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
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

export default ProductListPage;
