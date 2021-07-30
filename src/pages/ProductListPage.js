import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Product from "../components/Product";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        {/* <Link to="/">datas</Link> */}
        <Product>datas</Product>
        <Product>datas</Product>
        <Product>datas</Product>
      </div>
    );
  }
}
