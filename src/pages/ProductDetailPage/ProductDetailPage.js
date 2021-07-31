import React, { Component } from "react";
import {
  ORIGINAL_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  LOCAL_STORAGE,
} from "../../utils/constants";
import propTypes from "prop-types";
import {
  Col,
  Row,
  Typography,
  Button,
  Card,
  Descriptions,
  Divider,
} from "antd";
import {
  DescriptionContentContainer,
  DescriptionContentWrapper,
  DescriptionFollowers,
  DetailPageContainer,
  MainImgWrapper,
} from "./ProductDetailPageStyle";
import { UserOutlined } from "@ant-design/icons";
const { Title } = Typography;
import recentListStorage from "../../utils/storage/recentList";
class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "-1",
      original_data: ORIGINAL_DATA,
      disabled: false,
    };
  }
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
  }
  goRecentListPage = () => {
    this.props.history.push("/recent-list");
  };
  goProductListPage = () => {
    this.props.history.push("/product");
  };
  randomProduct(interestList, productId) {
    let temp = productId;
    while (temp === productId) {
      temp = Math.floor(Math.random() * interestList.length);
    }
    return interestList[temp] === undefined ? productId : interestList[temp];
  }
  async handleRandom(productId) {
    const interestList = await LOCAL_STORAGE.get("interestList");
    if (interestList.length <= 0) {
      return;
    }
    const nextProductId = this.randomProduct(interestList, productId);
    this.props.history.push(`/product/${nextProductId}`);
    this.setState({ productId: nextProductId });
  }
  async handleDislike(productId) {
    await recentListStorage.dislike(productId);
    const interestList = await LOCAL_STORAGE.get("interestList");
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
    await LOCAL_STORAGE.set("interestList", tempArray);
    const nextProductId = this.randomProduct(tempArray, productId);
    if (productId === nextProductId) {
      this.setState({ disabled: true });
      return;
    }
    this.props.history.push(`/product/${nextProductId}`);
  }
  render() {
    const { productId, original_data, disabled } = this.state;
    return (
      <DetailPageContainer>
        <Row gutter={[16, 16]} type="flex">
          <Col span={16}>
            <Title>상품 상세 페이지</Title>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button
              type="primary"
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
              <div style={{ width: "100%" }}>
                <Row>
                  <Col span={24}>
                    <Card
                      hoverable={true}
                      bodyStyle={{ padding: "0" }}
                      cover={
                        <MainImgWrapper>
                          <img
                            alt="productImage"
                            src={original_data[productId].imgUrl}
                            style={mainImgStyle}
                          />
                        </MainImgWrapper>
                      }
                    ></Card>
                  </Col>
                </Row>
              </div>
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
ProductDetailPage.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      productId: propTypes.string,
    }),
  }),
  history: propTypes.shape({
    push: propTypes.func,
  }),
};
export default ProductDetailPage;

const colStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
};

const cardBodyStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const mainImgStyle = {
  objectFit: "cover",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: "0px",
  right: "0px",
};

const randomButtonStyle = {
  marginBottom: "3rem",
  marginTop: "2rem",
};
