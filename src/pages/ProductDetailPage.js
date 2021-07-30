import React, { Component } from "react";
import { ORIGINAL_DATA } from "../utils/constants";

export default class ProductDetailPage extends Component {
  render() {
    return (
      <div>
        <div>{ORIGINAL_DATA[1].title}</div>
        <div>{ORIGINAL_DATA[1].brand}</div>
        <div>{ORIGINAL_DATA[1].price}</div>
        <div>{ORIGINAL_DATA[1].id}</div>
        <img src={ORIGINAL_DATA[1].imgUrl} alt="productImage" />
      </div>
    );
  }
}
