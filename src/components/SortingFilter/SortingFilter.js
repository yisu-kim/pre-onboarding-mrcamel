import React, { Component } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { ORDER_BY } from "utils/constants/constants";

class SortingFilter extends Component {
  static propTypes = {
    handleSortingFilter: PropTypes.func,
  };

  render() {
    return (
      <Select
        defaultValue={ORDER_BY.VIEW}
        onChange={this.props.handleSortingFilter}
      >
        <Select.Option value={ORDER_BY.VIEW}>최근 조회 순</Select.Option>
        <Select.Option value={ORDER_BY.PRICE}>낮은 가격 순</Select.Option>
      </Select>
    );
  }
}

export default SortingFilter;
