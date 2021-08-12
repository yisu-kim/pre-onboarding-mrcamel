import { LOCAL_STORAGE, STORAGE_KEYS } from "utils/constants/constants";

const get = () => {
  return LOCAL_STORAGE.get(STORAGE_KEYS.LAST_VISITED_DATE);
};

const set = (value) => {
  LOCAL_STORAGE.set(STORAGE_KEYS.LAST_VISITED_DATE, value);
};

const init = () => {
  set(new Date().getDate());
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
