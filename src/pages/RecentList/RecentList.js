import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "antd";
import { ORDER_BY } from "utils/constants/constants";
import productData from "utils/productData";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import recentListStorage from "utils/storage/recentList";
import Layout from "components/Layout";
import Product from "components/Product";
import BrandFilter from "components/BrandFilter";
import DislikeFilter from "components/DislikeFilter";
import SortingFilter from "components/SortingFilter";
import Menu from "./Menu";

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

  handleSortingFilter = (selected) => {
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
              <SortingFilter handleSortingFilter={this.handleSortingFilter} />
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
