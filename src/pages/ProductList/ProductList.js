import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import interestListStorage from "utils/storage/interestList";
import productData from "utils/productData";
import Layout from "components/Layout";
import Product from "components/Product";
import Menu from "./Menu";

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
