import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, message, Typography, Button, Select } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { LOCAL_STORAGE } from "utils/constants";
import { getOriginalInfo } from "utils/getOriginalInfo";
import Product from "components/Product";
import BrandFilterMenu from "components/BrandFilterMenu";
import DislikeFilter from "components/DislikeFilter";
import { RecentListContainer } from "./RecentListPageStyle";

class RecentListPage extends Component {
  state = {
    datas: [],
    checked: [],
    onlyInterestingProduct: false,
    filteredDatas: [],
    priceChecked: false,
    date: new Date(),
  };

  static propTypes = {
    recentList: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  update = () => {
    this.setState({
      date: new Date(),
    });
  };

  getRecentList = () => {
    this.setState({
      datas: LOCAL_STORAGE.get("recentList"),
    });
  };

  clearRecentList = () => {
    this.setState({
      datas: LOCAL_STORAGE.set("recentList", []),
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

  handleAccessPopup = (dislike) => {
    if (dislike) {
      message.warning("관심없는 상품으로 등록하신 상품입니다.", 1);
    }
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
    this.props.history.push("/product");
  };

  componentDidMount() {
    this.getRecentList();
    setInterval(this.update, 1000);
  }

  goProductListPage = () => {
    this.props.history.push("/product");
  };

  componentDidUpdate(prevProps, prevState) {
    const hour = this.state.date.getHours();
    const minute = this.state.date.getMinutes();
    const second = this.state.date.getSeconds();

    if (hour + minute + second === 0) {
      if (prevState.date !== this.state.date) {
        LOCAL_STORAGE.set("recentList", []),
          this.setState({
            datas: LOCAL_STORAGE.get("recentList"),
          });
      }
    }
  }

  render() {
    const { datas, checked, onlyInterestingProduct, priceChecked } = this.state;

    let products = datas;
    products = products.map((data) => {
      const originalData = getOriginalInfo(data.id);
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
        const originalData = getOriginalInfo(data.id);
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
            <Col span={8} style={buttonPositionStyle}>
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={this.goProductListPage}
              >
                {" "}
                상품 리스트 보기
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={16} md={16} xs={24}>
              <BrandFilterMenu handleBrandFilters={this.handleBrandFilters} />
            </Col>
            <Col lg={8} md={8} xs={24}>
              <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
              <Card size="small">
                <Select onChange={this.onSelectChange} defaultValue="view">
                  <Option value="view">최근 조회 순</Option>
                  <Option value="price">낮은 가격 순</Option>
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

export default RecentListPage;

const buttonPositionStyle = {
  textAlign: "right",
};

const { Title } = Typography;
const { Option } = Select;
