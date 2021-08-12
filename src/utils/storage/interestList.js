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

export default {
  get,
  set,
  init,
  isExist,
};
