import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ORIGINAL_DATA } from "../../utils/constants";
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

  componentDidMount() {
    this.getProductList();
  }

  render() {
    const { datas } = this.state;

    return (
      <div>
        <RecentListContainer>
          <ListTitle>상품 목록 페이지</ListTitle>

          <Row gutter={[16, 16]}>
            {datas.map((data) => {
              const originalData = data;

              return (
                <Col lg={6} md={8} xs={24} key={data.id}>
                  <Link to={`/product/${data.id}`}>
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
