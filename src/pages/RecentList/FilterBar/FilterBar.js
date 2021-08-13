import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row } from "antd";
import BrandFilter from "components/BrandFilter";
import DislikeFilter from "components/DislikeFilter";
import SortingFilter from "components/SortingFilter";
import style from "./FilterBarStyle";

class FilterBar extends Component {
  static propTypes = {
    handleBrandFilters: PropTypes.func,
    handleDislikeFilter: PropTypes.func,
    handleSortingFilter: PropTypes.func,
  };

  render() {
    return (
      <Card>
        <Row>
          <BrandFilter handleBrandFilters={this.props.handleBrandFilters} />
          <CustomDivider />
          <CustomSpace>
            <DislikeFilter
              handleDislikeFilter={this.props.handleDislikeFilter}
            />
            <SortingFilter
              handleSortingFilter={this.props.handleSortingFilter}
            />
          </CustomSpace>
        </Row>
      </Card>
    );
  }
}

export default FilterBar;

const { CustomSpace, CustomDivider } = style;
