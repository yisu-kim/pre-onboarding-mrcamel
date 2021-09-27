import { STORAGE_KEYS } from 'utils/constants/constants';
import LocalStorageWrapper from './storage';

type LastVisitedDate = number;
const lastVisitedDateStorage = new LocalStorageWrapper<LastVisitedDate>();

const get = (): LastVisitedDate | null => {
  return lastVisitedDateStorage.get(STORAGE_KEYS.LAST_VISITED_DATE);
};

const set = (value: LastVisitedDate): void => {
  lastVisitedDateStorage.set(STORAGE_KEYS.LAST_VISITED_DATE, value);
};

const init = (): void => {
  set(new Date().getDate());
};

const isExist = (): boolean => {
  return !!get();
};

export default {
  get,
  set,
  init,
  isExist,
};
