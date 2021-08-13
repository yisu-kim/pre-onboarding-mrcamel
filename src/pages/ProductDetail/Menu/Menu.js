import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Space } from "antd";
import { RollbackOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTES } from "utils/constants/constants";

class Menu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  goRecentListPage = () => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  goProductListPage = () => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render() {
    return (
      <Space>
        <Button icon={<RollbackOutlined />} onClick={this.goProductListPage}>
          상품 목록
        </Button>
        <Button
          type="primary"
          icon={<UserOutlined />}
          onClick={this.goRecentListPage}
        >
          최근 본 상품 목록
        </Button>
      </Space>
    );
  }
}

export default Menu;
