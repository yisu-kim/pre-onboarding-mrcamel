import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

export default class DislikeFilter extends Component {
  constructor() {
    super();
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(event) {
    this.props.handleDislikeFilter(event.target.checked);
  }

  render() {
    return (
      <div>
        <Checkbox onChange={this.handleCheckbox}>관심없는 상품 숨기기</Checkbox>
      </div>
    );
  }
}

DislikeFilter.propTypes = {
  handleDislikeFilter: PropTypes.func,
};
