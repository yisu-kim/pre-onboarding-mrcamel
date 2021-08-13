import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
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

  render() {
    return (
      <Button
        type="primary"
        icon={<UserOutlined />}
        onClick={this.goRecentListPage}
      >
        최근 본 상품 목록
      </Button>
    );
  }
}

export default Menu;
