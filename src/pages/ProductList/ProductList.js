import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROUTES } from "utils/constants/constants";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import interestListStorage from "utils/storage/interestList";
import Layout from "components/Layout";
import Product from "components/Product";
import productData from "utils/productData";

class ProductList extends Component {
  state = {
    products: [],
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
    if (new Date().getDate() !== lastVisitedDateStorage.get()) {
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
      products: interestListStorage.get().map((id) => productData.findById(id)),
    });
  };

  render() {
    const { products } = this.state;

    return (
      <Layout menu={<Menu history={this.props.history} />}>
        {products.length > 0 && (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        )}
      </Layout>
    );
  }
}

export default ProductList;

class Menu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  render() {
    return (
      <Button
        type="primary"
        icon={<UserOutlined />}
        onClick={this.goRecentListPage}
      >
        최근 본 상품 목록
      </Button>
    );
  }
}
