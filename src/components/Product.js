import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Col, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { ROUTES } from "utils/constants/constants";

class Product extends Component {
  constructor() {
    super();
    this.handleAccessPopup = this.handleAccessPopup.bind(this);
  }

  static propTypes = {
    product: PropTypes.object,
  };

  handleAccessPopup(dislike) {
    if (dislike) {
      message.warning("관심없는 상품으로 등록하신 상품입니다.", 1);
    }
  }

  render() {
    const { product } = this.props;

    return (
      <Col xl={6} lg={8} md={12} xs={24} key={product.id}>
        <Link
          to={(location) => {
            if (product.dislike) {
              return { ...location };
            }
            return {
              ...location,
              pathname: `${ROUTES.PRODUCT}/${product.id}`,
            };
          }}
          onClick={() => this.handleAccessPopup(product.dislike)}
        >
          <Card
            hoverable={true}
            cover={<img alt="example" src={product.imgUrl} />}
          >
            <Meta
              title={product.title}
              description={`${product.price.toLocaleString("ko-KR")}원`}
            />
          </Card>
        </Link>
      </Col>
    );
  }
}

export default Product;
