import React, { Component } from "react";
import BrandFilterMenu from "../../components/BrandFilterMenu/BrandFilterMenu";
import DislikeFilter from "../../components/DislikeFilter/DisLikeFilter";
import { style } from "./RecentListPageStyle";
import { ORIGINAL_DATA } from "../../utils/constants";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { RecentListContainer, ListTitle } = style;

export default class RecentListPage extends Component {
  state = {
    datas: [],
    checked: [],
  };

  loadData = async () => {
    const data = await ORIGINAL_DATA;
    this.setState({
      datas: data,
    });
  };

  handleFilters = (checked) => {
    this.setState({
      checked: checked,
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { datas, checked } = this.state;
    let filteredList;

    if (checked.length === 0) filteredList = datas;
    else filteredList = datas.filter((data) => checked.includes(data.brand));
    return (
      <div>
        <RecentListContainer>
          <ListTitle>상품 조회 목록 페이지</ListTitle>

          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <BrandFilterMenu handleFilters={this.handleFilters} />
            </Col>
            <Col lg={12} xs={24}>
              <DislikeFilter />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {filteredList.map((data, index) => (
              <Col lg={6} md={8} xs={24} key={index}>
                <Link to={`/product/${data.id}`}>
                  <Card
                    hoverable={true}
                    cover={
                      <img
                        alt="example"
                        style={cardImageStyle}
                        src={`${data.imgUrl}`}
                      />
                    }
                  >
                    <Meta title={data.title} description={`${data.brand}`} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </RecentListContainer>
      </div>
    );
  }
}

const cardImageStyle = {
  height: "150px",
};
