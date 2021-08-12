import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Typography,
  Button,
  Card,
  Descriptions,
  Divider,
} from "antd";
import { UserOutlined, RollbackOutlined } from "@ant-design/icons";
import {
  ORIGINAL_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  LOCAL_STORAGE,
  INTEREST_LIST_KEY,
  ROUTES,
} from "utils/constants/constants";
import recentListStorage from "utils/storage/recentList";
import {
  DescriptionContentContainer,
  DescriptionContentWrapper,
  DescriptionFollowers,
  DetailPageContainer,
} from "./ProductDetailPageStyle";

class ProductDetailPage extends Component {
  state = {
    productId: "-1",
    original_data: ORIGINAL_DATA,
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

  async componentDidUpdate() {
    const {
      match: {
        params: { productId },
      },
    } = this.props;
    await recentListStorage.update(productId);
  }

  async componentDidMount() {
    const {
      match: {
        params: { productId },
      },
    } = this.props;
    await recentListStorage.update(productId);

    const recentItem = await recentListStorage.get(productId);
    if (recentItem.dislike) {
      this.setState({ isBlocked: true });
    }
  }

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  handleRandom = async (productId) => {
    const interestList = await LOCAL_STORAGE.get(INTEREST_LIST_KEY);
    if (interestList.length <= 0) {
      return;
    }
    const nextProductId = randomProduct(interestList, productId);
    this.props.history.push(`${ROUTES.PRODUCT}/${nextProductId}`);
    this.setState({ productId: nextProductId });
  };

  handleDislike = async (productId) => {
    await recentListStorage.dislike(productId);
    const interestList = await LOCAL_STORAGE.get(INTEREST_LIST_KEY);
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
    await LOCAL_STORAGE.set(INTEREST_LIST_KEY, tempArray);
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
      <DetailPageContainer>
        <Row gutter={[16, 16]} type="flex">
          <Col span={16}>
            <Title>상품 상세 페이지</Title>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button
              icon={<RollbackOutlined />}
              onClick={this.goProductListPage}
              style={{ right: "10px" }}
            >
              {" "}
              상품 목록
            </Button>
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={this.goRecentListPage}
            >
              {" "}
              최근 본 상품 목록
            </Button>
          </Col>
        </Row>
        {productId !== -1 &&
        productId < MAX_PRODUCT_ID &&
        productId >= MIN_PRODUCT_ID ? (
          <Row>
            <Col sm={24} md={14} style={colStyle}>
              <img
                src={original_data[productId].imgUrl}
                alt="productImage"
                style={mainImgStyle}
              />
            </Col>
            {/* Start Description */}
            <Col sm={24} md={10}>
              <Card style={{ height: "100%" }} bodyStyle={cardBodyStyle}>
                <Title level={3}>{original_data[productId].title}</Title>
                <Divider style={{ margin: "16px 0px" }} />
                <Descriptions column={1} colon={false}>
                  <Descriptions.Item label="Brand">
                    <DescriptionContentContainer>
                      <DescriptionContentWrapper>
                        <DescriptionFollowers>
                          {/* <UserOutlined
                              style={{
                                color: "#1f29f0",
                                marginRight: "4px",
                              }}
                            />{" "} */}
                          <Typography
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            {original_data[productId].brand}
                          </Typography>
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
                <Divider />
                <Button
                  size="large"
                  onClick={() => this.handleRandom(productId)}
                  style={randomButtonStyle}
                  disabled={disabled}
                >
                  랜덤 상품 선택
                </Button>
                <Button
                  onClick={() => this.handleDislike(productId)}
                  size="large"
                  type="primary"
                  disabled={disabled}
                >
                  관심 없음
                </Button>
              </Card>
            </Col>
          </Row>
        ) : (
          <div>존재하지 않는 상품입니다.</div>
        )}
      </DetailPageContainer>
    );
  }
}

export default ProductDetailPage;

const colStyle = {
  display: "flex",
  justifyContent: "center",
};

const cardBodyStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const mainImgStyle = {
  width: "400px",
};

const randomButtonStyle = {
  marginBottom: "3rem",
  marginTop: "2rem",
};

const { Title } = Typography;

const randomProduct = (interestList, productId) => {
  let temp = productId;
  while (temp === productId) {
    temp = Math.floor(Math.random() * interestList.length);
  }
  return interestList[temp] === undefined ? productId : interestList[temp];
};
