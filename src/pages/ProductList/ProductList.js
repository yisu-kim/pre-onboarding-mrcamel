import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import {
  INTEREST_LIST_KEY,
  LOCAL_STORAGE,
  ROUTES,
} from "utils/constants/constants";
import Product from "components/Product";
import { CustomCol, ProductListContainer } from "./ProductListStyle";

class ProductList extends Component {
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
      datas: LOCAL_STORAGE.get(INTEREST_LIST_KEY).map((itemId) => ({
        id: itemId,
      })),
    });
  };

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
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

            <CustomCol span={8} textalign="right">
              <Button
                type="primary"
                icon={<UserOutlined />}
                onClick={this.goRecentListPage}
              >
                최근 본 상품 목록
              </Button>
            </CustomCol>
          </Row>

          <Product productList={datas} />
        </ProductListContainer>
      </div>
    );
  }
}

export default ProductList;
