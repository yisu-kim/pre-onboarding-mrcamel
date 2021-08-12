import productData from "utils/data/productData.json";
import { PRODUCT_DATA } from "./constants/constants";

export const createProductList = () => {
  const productList = [];
  productData.forEach((product, idx) => {
    productList.push({
      ...product,
      id: idx,
      imgUrl: `/images/image${(idx % 8) + 1}.jpg`,
    });
  });
  return productList;
};

export const getProduct = (id) => {
  return PRODUCT_DATA.find((data) => data.id === id);
};

export const getUniqueBrand = () => {
  const uniqueBrand = {};
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
