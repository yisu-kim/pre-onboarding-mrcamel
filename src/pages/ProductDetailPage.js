import React, { Component } from "react";
import {
  ORIGINAL_DATA,
  MIN_PRODUCT_ID,
  MAX_PRODUCT_ID,
  LOCAL_STORAGE,
  INTEREST_LIST,
} from "../utils/constants";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: -1,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (
      parseInt(nextProps.match.params.productId) >= MIN_PRODUCT_ID &&
      parseInt(nextProps.match.params.productId) < MAX_PRODUCT_ID
    )
      return { productId: parseInt(nextProps.match.params.productId) };
    return null;
  }
  render() {
    const { productId } = this.state;
    const handleRandom = () => {
      if (!LOCAL_STORAGE.get("interestList")) {
        LOCAL_STORAGE.set("interestList", INTEREST_LIST);
      }
      const interestList = LOCAL_STORAGE.get("interestList");
      if (interestList.length <= 0) {
        return;
      }
      const randomProduct = Math.floor(Math.random() * interestList.length);
      return `/product/${interestList[randomProduct]}`;
    };
    const handleDislike = () => {
      if (!LOCAL_STORAGE.get("interestList")) {
        LOCAL_STORAGE.set("interestList", INTEREST_LIST);
      }
      const interestList = LOCAL_STORAGE.get("interestList");
      const tempArray = [];
      Array.from(interestList).map((element) => {
        if (element !== productId) {
          tempArray.push(element);
        }
      });
      console.log(tempArray);
      LOCAL_STORAGE.set("interestList", tempArray);
    };
    return (
      <div>
        {productId !== -1 ? (
          <div>
            <div>{ORIGINAL_DATA[productId].title}</div>
            <div>{ORIGINAL_DATA[productId].brand}</div>
            <div>{ORIGINAL_DATA[productId].price}</div>
            <img src={ORIGINAL_DATA[productId].imgUrl} alt="productImage" />
            <Link to={handleRandom}>Random</Link>
            <button onClick={handleDislike}>Dislike</button>
          </div>
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
      productId: propTypes.number,
    }),
  }),
};

export default ProductDetailPage;
