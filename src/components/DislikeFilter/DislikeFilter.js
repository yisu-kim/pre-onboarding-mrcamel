import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Checkbox } from "antd";

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
      <Card size="small">
        <Checkbox onChange={this.handleCheckbox}>관심없는 상품 숨기기</Checkbox>
      </Card>
    );
  }
}

DislikeFilter.propTypes = {
  handleDislikeFilter: PropTypes.func,
};
