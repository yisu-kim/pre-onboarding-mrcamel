import { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Button, Descriptions, Divider, Space, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PRODUCT_DATA, ROUTES } from 'utils/constants/constants';
import productData, { Product } from 'utils/data/productData';
import interestListStorage from 'utils/storage/interestList';
import recentListStorage, { RecentItem } from 'utils/storage/recentList';
import {
  DescriptionContentContainer,
  DescriptionContentWrapper,
  DescriptionFollowers,
  CustomCol,
  CustomCard,
  ProductImg,
} from './ProductDetailStyle';
import Layout from 'components/Layout';
import Menu from './Menu';

type MatchParams = {
  productId: string;
};

type ProductDetailProps = {
  match: RouteComponentProps<MatchParams>['match'];
  history: RouteComponentProps['history'];
};

type ProductDetailState = {
  product?: Product & RecentItem;
  nextProductId: number;
  disabled: boolean;
};

class ProductDetail extends Component<ProductDetailProps, ProductDetailState> {
  state: ProductDetailState = {
    product: undefined,
    nextProductId: -1,
    disabled: false,
  };

  componentDidMount(): void {
    const {
      match: {
        params: { productId },
      },
    } = this.props;

    const id = parseInt(productId);

    if (id >= 0) {
      recentListStorage.addOrUpdateById(id);

      this.setState({
        product: {
          ...productData.findById(id),
          ...recentListStorage.findById(id),
        } as Product & RecentItem,
      });
    }
  }

  componentDidUpdate(): void {
    const { nextProductId } = this.state;
    if (nextProductId > 0) {
      recentListStorage.addOrUpdateById(nextProductId);

      this.setState({
        nextProductId: -1,
        product: {
          ...productData.findById(nextProductId),
          ...recentListStorage.findById(nextProductId),
        } as Product & RecentItem,
      });

      this.props.history.push(`${ROUTES.PRODUCT}/${nextProductId}`);
    }
  }

  handleRandom = (): void => {
    const { product } = this.state;
    if (product) {
      const { id } = product;
      this.getRandomProduct(id);
    }
  };

  handleDislike = (): void => {
    const { product } = this.state;
    if (product) {
      const { id } = product;
      recentListStorage.dislikeById(id);
      interestListStorage.removeById(id);

      this.getRandomProduct(id);
    }
  };

  getRandomProduct = (id: number): void => {
    const interestList = interestListStorage.get();
    if (interestList) {
      if (interestList.length === 1) {
        message.warning('마지막 상품입니다.', 1);
      }

      const nextProductId = randomProduct(interestList, id);
      this.setState({ nextProductId });
    }
  };

  render(): JSX.Element | null {
    const { product, disabled } = this.state;

    if (product) {
      if (product.id > PRODUCT_DATA.length - 1 || product.dislike) {
        return <Redirect to={ROUTES.PRODUCT} />;
      }

      return (
        <Layout menu={<Menu history={this.props.history} />}>
          <Space direction='vertical' size={24}>
            <Row>
              <CustomCol sm={24} md={14} textalign='center'>
                <ProductImg src={product.imgUrl} alt='product image' />
              </CustomCol>
              {/* Start Description */}
              <Col sm={24} md={10}>
                <CustomCard>
                  <Title level={3}>{product.title}</Title>
                  <Divider />
                  <Descriptions column={1} colon={false}>
                    <Descriptions.Item label='Brand'>
                      <DescriptionContentContainer>
                        <DescriptionContentWrapper>
                          <DescriptionFollowers>
                            {product.brand}
                          </DescriptionFollowers>
                        </DescriptionContentWrapper>
                      </DescriptionContentContainer>
                    </Descriptions.Item>
                    {/* Price */}
                    <Descriptions.Item label='Price'>
                      <DescriptionContentContainer>
                        <DescriptionContentWrapper>
                          {product.price}원
                        </DescriptionContentWrapper>
                      </DescriptionContentContainer>
                    </Descriptions.Item>
                  </Descriptions>
                </CustomCard>
              </Col>
            </Row>
            <Row justify='center'>
              <Space>
                <Button
                  onClick={this.handleDislike}
                  size='large'
                  disabled={disabled}
                >
                  관심 없음
                </Button>
                <Button
                  type='primary'
                  size='large'
                  onClick={this.handleRandom}
                  disabled={disabled}
                >
                  랜덤 상품
                </Button>
              </Space>
            </Row>
          </Space>
        </Layout>
      );
    }

    return null;
  }
}

export default ProductDetail;

const randomProduct = (interestList: number[], productId: number) => {
  let temp = productId;
  while (temp === productId) {
    temp = Math.floor(Math.random() * interestList.length);
  }
  return interestList[temp] === undefined ? productId : interestList[temp];
};
