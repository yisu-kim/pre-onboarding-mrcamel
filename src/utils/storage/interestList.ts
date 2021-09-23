import { PRODUCT_DATA, STORAGE_KEYS } from 'utils/constants/constants';
import LocalStorageWrapper from './storage';

type InterestItem = number;
const interestListStorage = new LocalStorageWrapper<InterestItem[]>();

const get = (): InterestItem[] | null => {
  return interestListStorage.get(STORAGE_KEYS.INTEREST_LIST);
};

const set = (value: InterestItem[]): void => {
  interestListStorage.set(STORAGE_KEYS.INTEREST_LIST, value);
};

const init = (): void => {
  const interestList: InterestItem[] = [];
  for (let i = 0; i < PRODUCT_DATA.length; i++) {
    interestList.push(i);
  }
  set(interestList);
};

const isExist = (): boolean => {
  return !!get();
};

const removeById = (id: number): void => {
  const interestList = get();
  if (!interestList) {
    return undefined;
  }

  let newInterestList: InterestItem[] = [];
  for (let i = 0; i < interestList.length; i++) {
    if (interestList[i] === id) {
      newInterestList = interestList
        .slice(0, i)
        .concat(interestList.slice(i + 1));
      break;
    }
  }
  set(newInterestList);
};

export default {
  get,
  set,
  init,
  isExist,
  removeById,
};
