import React, { Component } from "react";
import BrandFilterMenu from "../components/BrandFilterMenu";
import DislikeFilter from "../components/DislikeFilter";

export default class RecentListPage extends Component {
  constructor() {
    super();
    this.state = {
      onlyInterestingProduct: false,
    };
    this.handleDislikeFilter = this.handleDislikeFilter.bind(this);
  }

  handleDislikeFilter(checked) {
    this.setState({
      onlyInterestingProduct: checked,
    });
  }

  render() {
    return (
      <div>
        <div>
          <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
          <BrandFilterMenu />
        </div>
      </div>
    );
  }
}
