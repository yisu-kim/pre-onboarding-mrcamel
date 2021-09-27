import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Row, Space } from 'antd';
import { ORDER_BY } from 'utils/constants/constants';
import productData, { Product as ProductItem } from 'utils/productData';
import recentListStorage, { RecentItem } from 'utils/storage/recentList';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Menu from './Menu';
import FilterBar from './FilterBar';
import Clock from 'components/Clock';

type RecentListProps = {
  recentList: RecentItem[];
  history: RouteComponentProps['history'];
};

type RecentListState = {
  products: (ProductItem & RecentItem)[];
  checkedBrands: string[];
  isInteresting: boolean;
  orderBy: string;
};

class RecentList extends Component<RecentListProps, RecentListState> {
  state: RecentListState = {
    products: [],
    checkedBrands: [],
    isInteresting: false,
    orderBy: '',
  };

  componentDidMount(): void {
    this.getRecentList();
  }

  getRecentList = (): void => {
    this.setState({
      products: (recentListStorage.get() as RecentItem[]).map((item) => ({
        ...item,
        ...productData.findById(item.id),
      })) as (ProductItem & RecentItem)[],
    });
  };

  handleBrandFilters = (brands: string[]): void => {
    this.setState({
      checkedBrands: brands,
    });
  };

  handleDislikeFilter = (checked: boolean): void => {
    this.setState({
      isInteresting: checked,
    });
  };

  handleSortingFilter = (selected: string): void => {
    switch (selected) {
      case ORDER_BY.VIEW:
        this.setState({
          orderBy: ORDER_BY.VIEW,
        });
        break;
      case ORDER_BY.PRICE:
        this.setState({
          orderBy: ORDER_BY.PRICE,
        });
        break;
    }
  };

  render(): JSX.Element {
    const { products, checkedBrands, isInteresting, orderBy } = this.state;

    const filtered = filterProduct(products, isInteresting, checkedBrands);
    const sorted = sortProduct(filtered, orderBy);

    return (
      <>
        <Clock handleStorageUpdate={this.getRecentList} />
        <Layout menu={<Menu history={this.props.history} />}>
          <Space direction='vertical' size={24}>
            <FilterBar
              handleBrandFilters={this.handleBrandFilters}
              handleDislikeFilter={this.handleDislikeFilter}
              handleSortingFilter={this.handleSortingFilter}
            />
            {sorted.length > 0 && (
              <Row gutter={[16, 16]}>
                {sorted.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </Row>
            )}
          </Space>
        </Layout>
      </>
    );
  }
}

export default RecentList;

const filterProduct = (
  products: (ProductItem & RecentItem)[],
  isInteresting: boolean,
  checkedBrands: string[]
) => {
  let filtered = [...products];

  if (isInteresting) {
    filtered = filtered.filter((product) => product.dislike === false);
  }

  if (checkedBrands.length > 0) {
    filtered = filtered.filter((product) =>
      checkedBrands.includes(product.brand)
    );
  }

  return filtered;
};

const sortProduct = (
  filtered: (ProductItem & RecentItem)[],
  orderBy: string
) => {
  let sorted = [...filtered];

  switch (orderBy) {
    case ORDER_BY.VIEW:
      break;
    case ORDER_BY.PRICE:
      sorted = sorted.sort((a, b) => {
        return a.price - b.price;
      });
      break;
  }

  return sorted;
};
