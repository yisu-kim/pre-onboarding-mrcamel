import React, { Component } from "react";
import PropTypes from "prop-types";
import BrandFilterMenu from "../../components/BrandFilterMenu";
import DislikeFilter from "../../components/DislikeFilter";
import { style } from "./RecentListPageStyle";
import { LOCAL_STORAGE } from "../../utils/constants";
import { Row, Col, Card, message, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { getOriginalInfo } from "../../utils/getOriginalInfo";

const { Meta } = Card;
const { RecentListContainer, ListTitle } = style;

export default class RecentListPage extends Component {
  state = {
    datas: [],
    checked: [],
    onlyInterestingProduct: false,
    filteredDatas: [],
    priceChecked: false,
  };

  getRecentList = () => {
    this.setState({
      datas: LOCAL_STORAGE.get("recentList"),
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

  handlePriceSort = (e) => {
    this.setState({
      priceChecked: e.target.checked,
    });
  };

  componentDidMount() {
    this.getRecentList();
  }

  render() {
    const { datas, checked, onlyInterestingProduct, priceChecked } = this.state;
    let products = datas;
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
          <ListTitle>상품 조회 목록 페이지</ListTitle>

          <Row gutter={[16, 16]}>
            <Col lg={16} md={16} xs={24}>
              <BrandFilterMenu handleBrandFilters={this.handleBrandFilters} />
            </Col>

            <Col lg={8} md={8} xs={24}>
              <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
              <Card size="small">
                <Checkbox onChange={this.handlePriceSort}>
                  낮은 가격 순
                </Checkbox>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {filteredList.map((data) => {
              const originalData = getOriginalInfo(data.id);

              return (
                <Col lg={6} md={8} xs={24} key={data.id}>
                  <Link
                    to={(location) => {
                      if (data.dislike) {
                        return { ...location };
                      }
                      return {
                        ...location,
                        pathname: `/product/${data.id}`,
                      };
                    }}
                    onClick={() => this.handleAccessPopup(data.dislike)}
                  >
                    <Card
                      hoverable={true}
                      cover={
                        <img
                          alt="example"
                          style={cardImageStyle}
                          src={originalData.imgUrl}
                        />
                      }
                    >
                      <Meta
                        title={originalData.title}
                        description={originalData.brand}
                      />
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </RecentListContainer>
      </div>
    );
  }
}

const cardImageStyle = {
  height: "150px",
};

RecentListPage.propTypes = {
  recentList: PropTypes.array,
};
