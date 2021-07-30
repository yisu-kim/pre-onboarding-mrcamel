import React, { Component } from "react";
import BrandFilterMenu from "../components/BrandFilterMenu";
import DisLikeFilter from "../components/BrandFilterMenu";

export default class RecentListPage extends Component {
  render() {
    return (
      <div>
        <div>
          <DisLikeFilter />
          <BrandFilterMenu />
        </div>
      </div>
    );
  }
}
