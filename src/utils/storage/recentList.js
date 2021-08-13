import { LOCAL_STORAGE, STORAGE_KEYS } from "utils/constants/constants";

const get = () => {
  return LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST);
};

const set = (value) => {
  LOCAL_STORAGE.set(STORAGE_KEYS.RECENT_LIST, value);
};

const init = () => {
  set([]);
};

const isExist = () => {
  return !!get();
};

const findById = (productId) => {
  const id = parseInt(productId);
  const recentList = get();
  return recentList.filter((item) => item.id === id)[0];
};

const updateById = (productId) => {
  const recentList = get();
  if (!recentList) {
    return null;
  }

  const id = parseInt(productId);
  const findedItem = recentList.find((item) => item.id === id);

  let recentItem;
  if (findedItem) {
    recentItem = findedItem;
  } else {
    recentItem = {
      id,
      dislike: false,
    };
  }

  const newRecentList = removeDuplicatedItemById(get(), id);
  set([recentItem, ...newRecentList]);
};

const dislikeById = (productId) => {
  const id = parseInt(productId);

  const newRecentList = removeDuplicatedItemById(get(), id);
  set([{ ...findById(id), dislike: true }, ...newRecentList]);
};

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};

export default {
  get,
  set,
  init,
  isExist,
  findById,
  updateById,
  dislikeById,
};
