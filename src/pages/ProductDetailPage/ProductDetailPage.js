import React, { Component } from "react";
import {
  ORIGINAL_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  LOCAL_STORAGE,
  INTEREST_LIST,
} from "../../utils/constants";
import propTypes from "prop-types";
import { Col, Row, Typography, Button } from "antd";
import { DetailPageContainer } from "./ProductDetailPageStyle";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "-1",
      original_data: ORIGINAL_DATA,
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

  render() {
    const { productId, original_data } = this.state;

    const goRecentListPage = () => {
      this.props.history.push("/recent-list");
    };

    const goProductListPage = () => {
      this.props.history.push("/product");
    };

    const randomProduct = (interestList) => {
      let temp = productId;
      while (temp === productId) {
        temp = Math.floor(Math.random() * interestList.length);
      }
      return interestList[temp] === undefined ? productId : interestList[temp];
    };

    const handleRandom = async () => {
      let interestList = await LOCAL_STORAGE.get("interestList");
      if (interestList === null) {
        await LOCAL_STORAGE.set("interestList", INTEREST_LIST);
      }
      interestList = await LOCAL_STORAGE.get("interestList");
      if (interestList.length <= 0) {
        return;
      }
      const nextProductId = randomProduct(interestList);
      this.props.history.push(`/product/${nextProductId}`);
    };

    const handleDislike = async () => {
      let interestList = await LOCAL_STORAGE.get("interestList");
      if (interestList === null) {
        await LOCAL_STORAGE.set("interestList", INTEREST_LIST);
      }
      interestList = await LOCAL_STORAGE.get("interestList");
      if (interestList.length <= 0) {
        return;
      }
      let tempArray = [];
      for (let i = 0; i < interestList.length; i++) {
        if (interestList[i] === productId) {
          tempArray = interestList
            .slice(0, i)
            .concat(interestList.slice(i + 1));
          break;
        }
      }
      await LOCAL_STORAGE.set("interestList", tempArray);
      const nextProductId = randomProduct(tempArray);
      this.props.history.push(`/product/${nextProductId}`);
    };

    return (
      <div>
        {productId !== -1 &&
        productId < MAX_PRODUCT_ID &&
        productId >= MIN_PRODUCT_ID ? (
          <DetailPageContainer>
            <Row gutter={[16, 16]} type="flex">
              <Col span={16}>
                <Title>상품 상세 페이지</Title>
              </Col>

              <Col span={8} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={goProductListPage}
                  style={{ right: "10px" }}
                >
                  {" "}
                  상품 목록
                </Button>
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  onClick={goRecentListPage}
                >
                  {" "}
                  최근 본 상품 목록
                </Button>
              </Col>
            </Row>
            <img src={original_data[productId].imgUrl} alt="productImage" />
            <div>{original_data[productId].title}</div>
            <div>{original_data[productId].brand}</div>
            <div>{original_data[productId].price}</div>
            <Button onClick={handleRandom}>Random</Button>
            <Button onClick={handleDislike} style={{ left: "10px" }}>
              Dislike
            </Button>
          </DetailPageContainer>
        ) : (
          <div>잘못된 페이지입니다</div>
        )}
      </div>
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
