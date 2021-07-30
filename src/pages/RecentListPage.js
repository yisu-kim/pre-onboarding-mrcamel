import React, { Component } from "react";
import BrandFilterMenu from "../components/BrandFilterMenu";
import DislikeFilter from "../components/DislikeFilter";

export default class RecentListPage extends Component {
  render() {
    return (
      <div>
        <div>
          <DislikeFilter />
          <BrandFilterMenu />
        </div>
      </div>
    );
  }
}
