import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { message, Row } from 'antd';
import interestListStorage from 'utils/storage/interestList';
import productData, { Product as ProductItem } from 'utils/productData';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Clock from 'components/Clock';
import Menu from './Menu';

type ProductListProps = {
  history: RouteComponentProps['history'];
};

type ProductListState = {
  products: ProductItem[];
};

class ProductList extends Component<ProductListProps, ProductListState> {
  state: ProductListState = {
    products: [],
  };

  componentDidMount(): void {
    const interestList = interestListStorage.get();
    if (interestList) {
      if (interestList.length === 0) {
        message.warning('모든 상품을 확인하셨습니다.', 1);
        return;
      }
      this.getInterestList();
    }
  }

  getInterestList = (): void => {
    this.setState({
      products: (interestListStorage.get() as number[]).map((id) =>
        productData.findById(id)
      ) as ProductItem[],
    });
  };

  render(): JSX.Element {
    const { products } = this.state;

    return (
      <>
        <Clock handleStorageUpdate={this.getInterestList} />
        <Layout menu={<Menu history={this.props.history} />}>
          {products.length > 0 && (
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </Row>
          )}
        </Layout>
      </>
    );
  }
}

export default ProductList;
