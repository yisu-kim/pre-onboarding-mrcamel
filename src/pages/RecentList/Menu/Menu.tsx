import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { ROUTES } from 'utils/constants/constants';

type MenuProps = {
  history: RouteComponentProps['history'];
};

class Menu extends Component<MenuProps> {
  goProductListPage = (): void => {
    this.props.history.push(ROUTES.PRODUCT);
  };

  render(): JSX.Element {
    return (
      <Button
        type='primary'
        icon={<RollbackOutlined />}
        onClick={this.goProductListPage}
      >
        상품 리스트 보기
      </Button>
    );
  }
}

export default Menu;
