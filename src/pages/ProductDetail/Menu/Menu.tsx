import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Space } from 'antd';
import { RollbackOutlined, UserOutlined } from '@ant-design/icons';
import { ROUTES } from 'utils/constants/constants';

type MenuProps = {
  history: RouteComponentProps['history'];
};

class Menu extends Component<MenuProps> {
  goRecentListPage = (): void => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  goProductListPage = (): void => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render(): JSX.Element {
    return (
      <Space>
        <Button icon={<RollbackOutlined />} onClick={this.goProductListPage}>
          상품 목록
        </Button>
        <Button
          type='primary'
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
