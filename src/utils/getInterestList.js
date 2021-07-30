export const getInterestList = (MAX_PRODUCT_ID) => {
  const tempArray = [];
  for (let i = 0; i < MAX_PRODUCT_ID; i++) {
    tempArray.push(i);
  }
  return tempArray;
};
