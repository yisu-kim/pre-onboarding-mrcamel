import productData from "utils/data/productData.json";

export const getOriginalData = () => {
  const tempArray = [];
  productData.forEach((product, idx) => {
    tempArray.push({
      ...product,
      id: idx,
      imgUrl: `/images/image${(idx % 8) + 1}.jpg`,
    });
  });
  return tempArray;
};
