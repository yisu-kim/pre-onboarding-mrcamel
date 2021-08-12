import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROUTES } from "utils/constants/constants";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import interestListStorage from "utils/storage/interestList";
import Header from "components/Header";
import Product from "components/Product";
import { ProductListContainer } from "./ProductListStyle";

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
      datas: interestListStorage.get().map((itemId) => ({
        id: itemId,
      })),
    });
  };

  render() {
    const { datas } = this.state;

    return (
      <ProductListContainer>
        <Header>
          <Menu history={this.props.history} />
        </Header>
        <Product productList={datas} />
      </ProductListContainer>
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
