import React, { Component } from "react";
import PropTypes from "prop-types";
import { message, Row } from "antd";
import interestListStorage from "utils/storage/interestList";
import productData from "utils/productData";
import Layout from "components/Layout";
import Product from "components/Product";
import Menu from "./Menu";
import Clock from "components/Clock";

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
    const interestList = interestListStorage.get();
    if (interestList.length <= 0) {
      message.warning("모든 상품을 확인하셨습니다.", 1);
      return;
    }

    this.getInterestList();
  }

  getInterestList = () => {
    this.setState({
      products: interestListStorage.get().map((id) => productData.findById(id)),
    });
  };

  render() {
    const { products } = this.state;

    return (
      <>
        <Clock handleStorageUpdate={this.getInterestList} />
        <Layout menu={<Menu history={this.props.history} />}>
          {products.length > 0 && (
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </Row>
          )}
        </Layout>
      </>
    );
  }
}

export default ProductList;
