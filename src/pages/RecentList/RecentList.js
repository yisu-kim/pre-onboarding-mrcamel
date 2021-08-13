import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Select } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { ORDER_BY, ROUTES } from "utils/constants/constants";
import productData from "utils/productData";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import recentListStorage from "utils/storage/recentList";
import Layout from "components/Layout";
import Product from "components/Product";
import BrandFilter from "components/BrandFilter";
import DislikeFilter from "components/DislikeFilter";

class RecentList extends Component {
  state = {
    products: [],
    checkedBrands: [],
    isInteresting: false,
    orderBy: "",
  };

  static propTypes = {
    recentList: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.getRecentList();
  }

  componentDidUpdate() {
    if (new Date().getDate() !== lastVisitedDateStorage.get()) {
      initStorage();
      this.getRecentList();
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

  getRecentList = () => {
    this.setState({
      products: recentListStorage
        .get()
        .map((item) => ({ ...item, ...productData.findById(item.id) })),
    });
  };

  handleBrandFilters = (brands) => {
    this.setState({
      checkedBrands: brands,
    });
  };

  handleDislikeFilter = (checked) => {
    this.setState({
      isInteresting: checked,
    });
  };

  onSelectChange = (selected) => {
    switch (selected) {
      case ORDER_BY.VIEW:
        this.setState({
          orderBy: ORDER_BY.VIEW,
        });
        break;
      case ORDER_BY.PRICE:
        this.setState({
          orderBy: ORDER_BY.PRICE,
        });
        break;
    }
  };

  render() {
    const { products, checkedBrands, isInteresting, orderBy } = this.state;

    let filtered = filterProduct(products, isInteresting, checkedBrands);
    let sorted = sortProduct(filtered, orderBy);

    return (
      <Layout menu={<Menu history={this.props.history} />}>
        <Row gutter={[16, 16]}>
          <Col lg={16} md={16} xs={24}>
            <BrandFilter handleBrandFilters={this.handleBrandFilters} />
          </Col>
          <Col lg={8} md={8} xs={24}>
            <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
            <Card size="small">
              <Select onChange={this.onSelectChange} defaultValue="view">
                <Select.Option value={ORDER_BY.VIEW}>
                  최근 조회 순
                </Select.Option>
                <Select.Option value={ORDER_BY.PRICE}>
                  낮은 가격 순
                </Select.Option>
              </Select>
            </Card>
          </Col>
        </Row>
        {sorted.length > 0 && (
          <Row gutter={[16, 16]}>
            {sorted.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </Row>
        )}
      </Layout>
    );
  }
}

export default RecentList;

class Menu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render() {
    return (
      <Button
        type="primary"
        icon={<RollbackOutlined />}
        onClick={this.goProductListPage}
      >
        상품 리스트 보기
      </Button>
    );
  }
}

const filterProduct = (products, isInteresting, checkedBrands) => {
  let filtered = [...products];

  if (isInteresting) {
    filtered = filtered.filter((product) => product.dislike === false);
  }

  if (checkedBrands.length > 0) {
    filtered = filtered.filter((product) =>
      checkedBrands.includes(product.brand)
    );
  }

  return filtered;
};

const sortProduct = (filtered, orderBy) => {
  let sorted = [...filtered];

  switch (orderBy) {
    case ORDER_BY.VIEW:
      break;
    case ORDER_BY.PRICE:
      sorted = sorted.sort((a, b) => {
        return a.price - b.price;
      });
      break;
  }

  return sorted;
};
