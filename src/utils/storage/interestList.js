import {
  LOCAL_STORAGE,
  PRODUCT_DATA,
  STORAGE_KEYS,
} from "utils/constants/constants";

const get = () => {
  return LOCAL_STORAGE.get(STORAGE_KEYS.INTEREST_LIST);
};

const set = (value) => {
  LOCAL_STORAGE.set(STORAGE_KEYS.INTEREST_LIST, value);
};

const init = () => {
  const interestList = [];
  for (let i = 0; i < PRODUCT_DATA.length; i++) {
    interestList.push(i);
  }
  set(interestList);
};

const isExist = () => {
  return !!get();
};

const removeById = (productId) => {
  const id = parseInt(productId);
  const interestList = get();

  let newInterestList = [];
  for (let i = 0; i < interestList.length; i++) {
    if (interestList[i] === id) {
      newInterestList = interestList
        .slice(0, i)
        .concat(interestList.slice(i + 1));
      break;
    }
  }
  return newInterestList;
};

export default {
  get,
  set,
  init,
  isExist,
  removeById,
};
