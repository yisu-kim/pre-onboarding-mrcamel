import { STORAGE_KEYS } from 'utils/constants/constants';
import LocalStorageWrapper from './storage';

type RecentItem = { id: number; dislike: boolean };
const recentListStorage = new LocalStorageWrapper<RecentItem[]>();

const get = (): RecentItem[] | null => {
  return recentListStorage.get(STORAGE_KEYS.RECENT_LIST);
};

const set = (value: RecentItem[]): void => {
  recentListStorage.set(STORAGE_KEYS.RECENT_LIST, value);
};

const init = (): void => {
  set([]);
};

const isExist = (): boolean => {
  return !!get();
};

const findById = (id: number): RecentItem | undefined => {
  const recentList = get();
  if (!recentList) {
    return undefined;
  }

  return recentList.find((item) => item.id === id);
};

const addOrUpdateById = (id: number): void => {
  const recentList = get();
  if (!recentList) {
    return undefined;
  }

  let recentItem = {
    id,
    dislike: false,
  };
  const findedItem = findById(id);
  if (findedItem) {
    recentItem = findedItem;
  }
  const newRecentList = removeDuplicatedItemById(recentList, id);
  set([recentItem, ...newRecentList]);
};

const dislikeById = (id: number): void => {
  const recentList = get();
  if (!recentList) {
    return undefined;
  }

  const findedItem = findById(id);
  if (findedItem) {
    const recentItem = { ...findedItem, dislike: true };
    const newRecentList = removeDuplicatedItemById(recentList, id);
    set([recentItem, ...newRecentList]);
  }
};

const removeDuplicatedItemById = (arr: RecentItem[], id: number) => {
  return arr.filter((item) => item.id !== id);
};

export default {
  get,
  set,
  init,
  isExist,
  findById,
  addOrUpdateById,
  dislikeById,
};
