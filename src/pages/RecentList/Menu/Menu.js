import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { ROUTES } from "utils/constants/constants";

class Menu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render() {
    return (
      <Button
        type="primary"
        icon={<RollbackOutlined />}
        onClick={this.goProductListPage}
      >
        상품 리스트 보기
      </Button>
    );
  }
}

export default Menu;
