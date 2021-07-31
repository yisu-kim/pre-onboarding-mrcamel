import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE, ORIGINAL_DATA } from "../../utils/constants";
// import { getOriginalInfo } from "../../utils/getOriginalInfo";
import { style } from "./RecentListPageStyle";
const { RecentListContainer, ListTitle } = style;

export default class ProductList extends Component {
  state = {
    datas: [],
  };

  getProductList = async () => {
    this.setState({
      datas: await ORIGINAL_DATA,
    });
  };

  handleRecentList = async (data) => {
    const recentItem = {
      id: data.id,
      dislike: false,
    };
    const newRecentList = removeDuplicatedItemById(
      await LOCAL_STORAGE.get("recentList"),
      data.id
    );

    LOCAL_STORAGE.set("recentList", [recentItem, ...newRecentList]);
  };

  componentDidMount() {
    this.getProductList();
  }

  render() {
    const { datas } = this.state;

    return (
      <div>
        <Link to="/recent-list">최근 조회 이력</Link>
        <RecentListContainer>
          <ListTitle>상품 목록 페이지</ListTitle>

          <Row gutter={[16, 16]}>
            {datas.map((data) => {
              const originalData = data;

              return (
                <Col lg={6} md={8} xs={24} key={data.id}>
                  <Link
                    to={`/product/${data.id}`}
                    onClick={() => this.handleRecentList(data)}
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

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
