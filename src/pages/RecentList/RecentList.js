import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { RollbackOutlined } from "@ant-design/icons";
import { ROUTES } from "utils/constants/constants";
import productData from "utils/productData";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";
import recentListStorage from "utils/storage/recentList";
import Product from "components/Product";
import BrandFilter from "components/BrandFilter";
import DislikeFilter from "components/DislikeFilter";
import { RecentListContainer, CustomCol } from "./RecentListStyle";

class RecentList extends Component {
  state = {
    datas: [],
    checked: [],
    onlyInterestingProduct: false,
    filteredDatas: [],
    priceChecked: false,
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
      datas: recentListStorage.get(),
    });
  };

  handleBrandFilters = (checked) => {
    this.setState({
      checked: checked,
    });
  };

  handleDislikeFilter = (checked) => {
    this.setState({
      onlyInterestingProduct: checked,
    });
  };

  onSelectChange = (value) => {
    value === "price"
      ? this.setState({
          priceChecked: true,
        })
      : this.setState({
          priceChecked: false,
        });
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render() {
    const { datas, checked, onlyInterestingProduct, priceChecked } = this.state;

    let products = datas;
    products = products.map((data) => {
      const originalData = productData.findById(data.id);
      return { ...data, price: originalData.price };
    });

    let filteredList;
    const compareFunction = (a, b) => {
      return a.price - b.price;
    };
    if (onlyInterestingProduct) {
      products = products.filter((data) => data.dislike === false);
    }
    if (checked.length === 0) {
      filteredList = products;
      if (priceChecked) {
        filteredList = products.sort(compareFunction);
      }
    } else {
      filteredList = products.filter((data) => {
        const originalData = productData.findById(data.id);
        return checked.includes(originalData.brand);
      });
      if (priceChecked) {
        filteredList = filteredList.sort(compareFunction);
      }
    }
    return (
      <div>
        <RecentListContainer>
          <Row type="flex">
            <Col span={16}>
              <Title>상품 조회 목록 페이지</Title>
            </Col>
            <CustomCol span={8} textalign="right">
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={this.goProductListPage}
              >
                상품 리스트 보기
              </Button>
            </CustomCol>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={16} md={16} xs={24}>
              <BrandFilter handleBrandFilters={this.handleBrandFilters} />
            </Col>
            <Col lg={8} md={8} xs={24}>
              <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
              <Card size="small">
                <Select onChange={this.onSelectChange} defaultValue="view">
                  <Select.Option value="view">최근 조회 순</Select.Option>
                  <Select.Option value="price">낮은 가격 순</Select.Option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Product productList={filteredList} />
        </RecentListContainer>
      </div>
    );
  }
}

export default RecentList;
