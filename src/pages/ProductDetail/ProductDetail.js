import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Col, Row, Button, Descriptions, Divider, Space, message } from "antd";
import Title from "antd/lib/typography/Title";
import { ROUTES } from "utils/constants/constants";
import productData from "utils/productData";
import interestListStorage from "utils/storage/interestList";
import recentListStorage from "utils/storage/recentList";
import {
  DescriptionContentContainer,
  DescriptionContentWrapper,
  DescriptionFollowers,
  CustomCol,
  CustomCard,
  ProductImg,
} from "./ProductDetailStyle";
import Layout from "components/Layout";
import Menu from "./Menu";

class ProductDetail extends Component {
  state = {
    product: {},
    nextProductId: -1,
    disabled: false,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        productId: PropTypes.string,
      }),
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  componentDidMount() {
    const {
      match: {
        params: { productId },
      },
    } = this.props;

    if (productId >= 0) {
      recentListStorage.updateById(productId);

      this.setState({
        product: {
          ...productData.findById(productId),
          ...recentListStorage.findById(productId),
        },
      });
    }
  }

  componentDidUpdate() {
    const { nextProductId } = this.state;
    if (nextProductId > 0) {
      recentListStorage.updateById(nextProductId);

      this.setState({
        nextProductId: -1,
        product: {
          ...productData.findById(nextProductId),
          ...recentListStorage.findById(nextProductId),
        },
      });

      this.props.history.push(`${ROUTES.PRODUCT}/${nextProductId}`);
    }
  }

  handleRandom = () => {
    const {
      product: { id },
    } = this.state;
    const interestList = interestListStorage.get();
    if (interestList.length === 1) {
      message.warning("마지막 상품입니다.", 1);
    }

    const nextProductId = randomProduct(interestList, id);
    this.setState({ nextProductId });
  };

  handleDislike = () => {
    const {
      product: { id },
    } = this.state;
    recentListStorage.dislikeById(id);

    const newInterestList = interestListStorage.removeById(id);
    interestListStorage.set(newInterestList);

    const nextProductId = randomProduct(newInterestList, id);

    this.setState({ nextProductId });
  };

  render() {
    const { product, disabled } = this.state;

    if (product.dislike) {
      return <Redirect to={ROUTES.PRODUCT} />;
    }

    return (
      <Layout menu={<Menu history={this.props.history} />}>
        <Space direction="vertical" size={24}>
          <Row>
            <CustomCol sm={24} md={14} textalign="center">
              <ProductImg src={product.imgUrl} alt="product image" />
            </CustomCol>
            {/* Start Description */}
            <Col sm={24} md={10}>
              <CustomCard>
                <Title level={3}>{product.title}</Title>
                <Divider />
                <Descriptions column={1} colon={false}>
                  <Descriptions.Item label="Brand">
                    <DescriptionContentContainer>
                      <DescriptionContentWrapper>
                        <DescriptionFollowers>
                          {product.brand}
                        </DescriptionFollowers>
                      </DescriptionContentWrapper>
                    </DescriptionContentContainer>
                  </Descriptions.Item>
                  {/* Price */}
                  <Descriptions.Item label="Price">
                    <DescriptionContentContainer>
                      <DescriptionContentWrapper>
                        {product.price}원
                      </DescriptionContentWrapper>
                    </DescriptionContentContainer>
                  </Descriptions.Item>
                </Descriptions>
              </CustomCard>
            </Col>
          </Row>
          <Row justify="center">
            <Space>
              <Button
                onClick={this.handleDislike}
                size="large"
                disabled={disabled}
              >
                관심 없음
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={this.handleRandom}
                disabled={disabled}
              >
                랜덤 상품
              </Button>
            </Space>
          </Row>
        </Space>
      </Layout>
    );
  }
}

export default ProductDetail;

const randomProduct = (interestList, productId) => {
  let temp = productId;
  while (temp === productId) {
    temp = Math.floor(Math.random() * interestList.length);
  }
  return interestList[temp] === undefined ? productId : interestList[temp];
};
