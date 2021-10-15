import productData from 'utils/data/productData.json';
import { PRODUCT_DATA } from '../constants/constants';

export type Product = {
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

export const PRODUCT_LIST = create();

const findById = (id: number): Product | undefined => {
  return PRODUCT_LIST.find((data) => data.id === id);
};

const getUniqueBrand = (): { label: string; value: string }[] => {
  type UniqueBrand = { [brand: string]: boolean };
  const uniqueBrand: UniqueBrand = {};
  PRODUCT_LIST.filter(({ brand }) => {
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
