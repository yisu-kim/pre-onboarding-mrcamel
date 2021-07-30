import React, { Component } from "react";
import { originalData } from "../utils/constants";

export default class ProductDetailPage extends Component {
  render() {
    return (
      <div>
        <div>{originalData[1].title}</div>
        <div>{originalData[1].brand}</div>
        <div>{originalData[1].price}</div>
        <div>{originalData[1].id}</div>
        <img src={originalData[1].imgUrl} alt="productImage" />
      </div>
    );
  }
}
