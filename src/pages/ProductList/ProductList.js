import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { LOCAL_STORAGE, ROUTES, STORAGE_KEYS } from "utils/constants/constants";
import { initStorage } from "utils/storage/init";
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

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.getInterestList();
  }

  componentDidUpdate() {
    if (
      new Date().getDate() !== LOCAL_STORAGE.get(STORAGE_KEYS.LAST_VISITED_DATE)
    ) {
      initStorage();
      this.getInterestList();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date().getDate(),
    });
  }

  getInterestList = () => {
    this.setState({
      datas: LOCAL_STORAGE.get(STORAGE_KEYS.INTEREST_LIST).map((itemId) => ({
        id: itemId,
      })),
    });
  };

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

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
