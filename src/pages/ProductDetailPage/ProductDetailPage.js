import React, { Component } from "react";
import {
  ORIGINAL_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  LOCAL_STORAGE,
} from "../../utils/constants";
import propTypes from "prop-types";
import { Col, Row, Typography, Button } from "antd";
import { DetailPageContainer } from "./ProductDetailPageStyle";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;
import recentListStorage from "../../utils/storage/recentList";

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
    this.props.history.push(`/product/${nextProductId}`);
  }
  render() {
    const { productId, original_data } = this.state;
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
          <div style={{ display: "flex" }}>
            <img src={original_data[productId].imgUrl} alt="productImage" />
            <div>
              <div>{original_data[productId].title}</div>
              <div>{original_data[productId].brand}</div>
              <div>{original_data[productId].price}</div>
            </div>
          </div>
        ) : (
          <div>존재하지 않는 상품입니다.</div>
        )}
        <div>
          <Button
            onClick={() => this.handleRandom(productId)}
            style={{ margin: "10px" }}
          >
            Random
          </Button>
          <Button
            onClick={() => this.handleDislike(productId)}
            style={{ margin: "10px" }}
          >
            Dislike
          </Button>
        </div>
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
