import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROUTES } from 'utils/constants/constants';

type MenuProps = {
  history: RouteComponentProps['history'];
};

class Menu extends Component<MenuProps> {
  goRecentListPage = (): void => {
    this.props.history.push(ROUTES.RECENT_LIST);
  };

  render(): JSX.Element {
    return (
      <Button
        type='primary'
        icon={<UserOutlined />}
        onClick={this.goRecentListPage}
      >
        최근 본 상품 목록
      </Button>
    );
  }
}

export default Menu;
