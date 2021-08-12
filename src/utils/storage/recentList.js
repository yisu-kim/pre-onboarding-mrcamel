import { LOCAL_STORAGE, RECENT_LIST_KEY } from "utils/constants/constants";

const get = async (productId) => {
  const id = parseInt(productId);
  const recentList = await LOCAL_STORAGE.get(RECENT_LIST_KEY);
  return recentList.filter((item) => item.id === id)[0];
};

const update = async (productId) => {
  const recentList = await LOCAL_STORAGE.get(RECENT_LIST_KEY);
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
    await LOCAL_STORAGE.get(RECENT_LIST_KEY),
    id
  );
  await LOCAL_STORAGE.set(RECENT_LIST_KEY, [recentItem, ...newRecentList]);
};

const dislike = async (productId) => {
  const id = parseInt(productId);

  const recentList = await LOCAL_STORAGE.get(RECENT_LIST_KEY);
  recentList.find((item) => item.id === id).dislike = true;
  await LOCAL_STORAGE.set(RECENT_LIST_KEY, recentList);
};

export default {
  get,
  update,
  dislike,
};

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
