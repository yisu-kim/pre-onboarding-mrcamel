import { LOCAL_STORAGE } from "utils/constants/constants";

const get = async (productId) => {
  const id = parseInt(productId);
  const recentList = await LOCAL_STORAGE.get("recentList");
  return recentList.filter((item) => item.id === id)[0];
};

const update = async (productId) => {
  const recentList = await LOCAL_STORAGE.get("recentList");
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
    await LOCAL_STORAGE.get("recentList"),
    id
  );
  await LOCAL_STORAGE.set("recentList", [recentItem, ...newRecentList]);
};

const dislike = async (productId) => {
  const id = parseInt(productId);

  const recentList = await LOCAL_STORAGE.get("recentList");
  recentList.find((item) => item.id === id).dislike = true;
  await LOCAL_STORAGE.set("recentList", recentList);
};

export default {
  get,
  update,
  dislike,
};

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
