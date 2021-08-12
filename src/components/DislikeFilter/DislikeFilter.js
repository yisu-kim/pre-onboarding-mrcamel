import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Checkbox } from "antd";

class DislikeFilter extends Component {
  static propTypes = {
    handleDislikeFilter: PropTypes.func,
  };

  handleCheckbox = (event) => {
    this.props.handleDislikeFilter(event.target.checked);
  };

  render() {
    return (
      <Card size="small">
        <Checkbox onChange={this.handleCheckbox}>관심없는 상품 숨기기</Checkbox>
      </Card>
    );
  }
}

export default DislikeFilter;
