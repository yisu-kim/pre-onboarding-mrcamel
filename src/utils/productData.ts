import productData from 'utils/data/productData.json';
import { PRODUCT_DATA } from './constants/constants';

type Product = {
  title: string;
  brand: string;
  price: number;
  id: number;
  imgUrl: string;
};

const create = (): Product[] => {
  const productList: Product[] = [];
  productData.forEach((product, idx) => {
    productList.push({
      ...product,
      id: idx,
      imgUrl: `/images/image${(idx % 8) + 1}.jpg`,
    });
  });
  return productList;
};

const findById = (productId: string): Product | undefined => {
  const id = parseInt(productId);
  return PRODUCT_DATA.find((data) => data.id === id);
};

const getUniqueBrand = (): { label: string; value: string }[] => {
  type UniqueBrand = { [brand: string]: boolean };
  const uniqueBrand: UniqueBrand = {};
  PRODUCT_DATA.filter(({ brand }) => {
    if (uniqueBrand[brand]) {
      return false;
    }
    uniqueBrand[brand] = true;
    return true;
  });

  return Object.keys(uniqueBrand).map((brand) => ({
    label: brand,
    value: brand,
  }));
};

export default {
  create,
  findById,
  getUniqueBrand,
};
