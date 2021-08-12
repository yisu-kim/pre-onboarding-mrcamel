import { LOCAL_STORAGE, STORAGE_KEYS } from "utils/constants/constants";

const get = (productId) => {
  const id = parseInt(productId);
  const recentList = LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST);
  return recentList.filter((item) => item.id === id)[0];
};

const update = (productId) => {
  const recentList = LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST);
  if (!recentList) {
    return null;
  }

  const id = parseInt(productId);
  let recentItem;

  const findedItem = recentList.find((item) => item.id === id);

  if (findedItem) {
    recentItem = findedItem;
  } else {
    recentItem = {
      id,
      dislike: false,
    };
  }

  const newRecentList = removeDuplicatedItemById(
    LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST),
    id
  );
  LOCAL_STORAGE.set(STORAGE_KEYS.RECENT_LIST, [recentItem, ...newRecentList]);
};

const dislike = (productId) => {
  const id = parseInt(productId);

  const recentList = LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST);
  recentList.find((item) => item.id === id).dislike = true;
  LOCAL_STORAGE.set(STORAGE_KEYS.RECENT_LIST, recentList);
};

export default {
  get,
  update,
  dislike,
};

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
