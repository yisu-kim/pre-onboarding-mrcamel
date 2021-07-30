import React, { Component } from "react";
import PropTypes from "prop-types";
import BrandFilterMenu from "../../components/BrandFilterMenu";
import DislikeFilter from "../../components/DislikeFilter";
import { style } from "./RecentListPageStyle";
import { LOCAL_STORAGE } from "../../utils/constants";
import { Row, Col, Card, message } from "antd";
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

  componentDidMount() {
    this.getRecentList();
  }

  render() {
    const { datas, checked, onlyInterestingProduct } = this.state;
    let products = datas;
    let filteredList;

    if (onlyInterestingProduct) {
      products = products.filter((data) => data.dislike === false);
    }

    if (checked.length === 0) {
      filteredList = products;
    } else {
      filteredList = products.filter((data) => {
        const originalData = getOriginalInfo(data.id);
        return checked.includes(originalData.brand);
      });
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
