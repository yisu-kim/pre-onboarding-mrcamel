import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { ROUTES } from 'utils/constants/constants';

type HeaderProps = {
  menu: JSX.Element;
};

class Header extends Component<HeaderProps> {
  render(): JSX.Element {
    return (
      <Row justify='space-between' align='middle'>
        <Col>
          <Link to={ROUTES.PRODUCT}>
            <img alt='logo' src='/logo.png' />
          </Link>
        </Col>
        <Col>{this.props.menu}</Col>
      </Row>
    );
  }
}

export default Header;
