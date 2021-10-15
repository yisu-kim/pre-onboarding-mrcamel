import { STORAGE_KEYS } from 'utils/constants/constants';
import interestListStorage from '../interestList';

const setItem = jest.spyOn(Storage.prototype, 'setItem');
const getItem = jest.spyOn(Storage.prototype, 'getItem');

describe('interestList 로컬스토리지 테스트', () => {
  test('get 테스트', () => {
    interestListStorage.get();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.INTEREST_LIST);
  });
  test('set 테스트', () => {
    const interestList = [1, 2, 3];
    interestListStorage.set(interestList);
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.INTEREST_LIST,
      JSON.stringify(interestList)
    );
  });
  test('초기화 테스트', () => {
    const interestList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99,
    ];
    interestListStorage.init();
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.INTEREST_LIST,
      JSON.stringify(interestList)
    );
  });
  test('값 존재 여부 테스트', () => {
    interestListStorage.isExist();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.INTEREST_LIST);
  });
});
