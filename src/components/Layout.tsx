import { Component } from 'react';
import { Col, Row } from 'antd';
import Header from 'components/Header';

type LayoutProps = {
  menu?: JSX.Element;
  children: JSX.Element | false;
};

class Layout extends Component<LayoutProps> {
  render(): JSX.Element {
    return (
      <Row gutter={[0, 16]} justify='center'>
        <Col xs={22} sm={20} md={18} xl={16}>
          <Header menu={this.props.menu}></Header>
        </Col>

        <Col xs={22} sm={20} md={18} xl={16}>
          <div>{this.props.children}</div>
        </Col>
      </Row>
    );
  }
}

export default Layout;
