import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Col, Row, Button, Descriptions, Divider, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { UserOutlined, RollbackOutlined } from "@ant-design/icons";
import {
  PRODUCT_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  ROUTES,
} from "utils/constants/constants";
import interestListStorage from "utils/storage/interestList";
import recentListStorage from "utils/storage/recentList";
import {
  DescriptionContentContainer,
  DescriptionContentWrapper,
  DescriptionFollowers,
  CustomCol,
  CustomCard,
  ProductImg,
  CustomRow,
} from "./ProductDetailStyle";
import Layout from "components/Layout";

class ProductDetail extends Component {
  state = {
    productId: "-1",
    original_data: PRODUCT_DATA,
    disabled: false,
    isBlocked: false,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const productId = nextProps.match.params.productId;
    if (prevState.productId !== "-1") {
      return { productId: parseInt(productId) };
    } else if (
      (parseInt(productId) >= MIN_PRODUCT_ID &&
        parseInt(productId) < MAX_PRODUCT_ID) ||
      prevState.productId !== parseInt(productId)
    ) {
      return { productId: parseInt(productId) };
    }
    return null;
  }

  componentDidUpdate() {
    const {
      match: {
        params: { productId },
      },
    } = this.props;
    recentListStorage.updateById(productId);
  }

  componentDidMount() {
    const {
      match: {
        params: { productId },
      },
    } = this.props;
    recentListStorage.updateById(productId);

    const recentItem = recentListStorage.findById(productId);
    if (recentItem.dislike) {
      this.setState({ isBlocked: true });
    }
  }

  handleRandom = async (productId) => {
    const interestList = interestListStorage.get();
    if (interestList.length <= 0) {
      return;
    }
    const nextProductId = randomProduct(interestList, productId);
    this.props.history.push(`${ROUTES.PRODUCT}/${nextProductId}`);
    this.setState({ productId: nextProductId });
  };

  handleDislike = (productId) => {
    recentListStorage.dislikeById(productId);
    const interestList = interestListStorage.get();
    if (interestList.length <= 0) {
      return;
    }
    let tempArray = [];
    for (let i = 0; i < interestList.length; i++) {
      if (interestList[i] === productId) {
        tempArray = interestList.slice(0, i).concat(interestList.slice(i + 1));
        break;
      }
    }
    interestListStorage.set(tempArray);
    const nextProductId = randomProduct(tempArray, productId);
    if (productId === nextProductId) {
      this.setState({ disabled: true });
      return;
    }
    this.props.history.push(`${ROUTES.PRODUCT}/${nextProductId}`);
  };

  render() {
    const { productId, original_data, disabled, isBlocked } = this.state;

    if (isBlocked) {
      return <Redirect to={ROUTES.PRODUCT} />;
    }

    return (
      <Layout menu={<Menu history={this.props.history} />}>
        {productId !== -1 &&
        productId < MAX_PRODUCT_ID &&
        productId >= MIN_PRODUCT_ID ? (
          <>
            <Row>
              <CustomCol sm={24} md={14} textalign="center">
                <ProductImg
                  src={original_data[productId].imgUrl}
                  alt="product image"
                />
              </CustomCol>
              {/* Start Description */}
              <Col sm={24} md={10}>
                <CustomCard>
                  <Title level={3}>{original_data[productId].title}</Title>
                  <Divider />
                  <Descriptions column={1} colon={false}>
                    <Descriptions.Item label="Brand">
                      <DescriptionContentContainer>
                        <DescriptionContentWrapper>
                          <DescriptionFollowers>
                            {original_data[productId].brand}
                          </DescriptionFollowers>
                        </DescriptionContentWrapper>
                      </DescriptionContentContainer>
                    </Descriptions.Item>
                    {/* Price */}
                    <Descriptions.Item label="Price">
                      <DescriptionContentContainer>
                        <DescriptionContentWrapper>
                          {original_data[productId].price}원
                        </DescriptionContentWrapper>
                      </DescriptionContentContainer>
                    </Descriptions.Item>
                  </Descriptions>
                </CustomCard>
              </Col>
            </Row>
            <CustomRow justify="center" margin="5em 0 0">
              <Space>
                <Button
                  onClick={() => this.handleDislike(productId)}
                  size="large"
                  disabled={disabled}
                >
                  관심 없음
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => this.handleRandom(productId)}
                  disabled={disabled}
                >
                  랜덤 상품
                </Button>
              </Space>
            </CustomRow>
          </>
        ) : (
          <div>존재하지 않는 상품입니다.</div>
        )}
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

class Menu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render() {
    return (
      <Space>
        <Button icon={<RollbackOutlined />} onClick={this.goProductListPage}>
          상품 목록
        </Button>
        <Button
          type="primary"
          icon={<UserOutlined />}
          onClick={this.goRecentListPage}
        >
          최근 본 상품 목록
        </Button>
      </Space>
    );
  }
}
