import { STORAGE_KEYS } from 'utils/constants/constants';
import lastVisitedDateStorage from '../lastVisitedDate';

const setItem = jest.spyOn(Storage.prototype, 'setItem');
const getItem = jest.spyOn(Storage.prototype, 'getItem');

describe('lastVisitedDate 로컬스토리지 테스트', () => {
  test('get 테스트', () => {
    lastVisitedDateStorage.get();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.LAST_VISITED_DATE);
  });
  test('set 테스트', () => {
    const date = 15;
    lastVisitedDateStorage.set(date);
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.LAST_VISITED_DATE,
      JSON.stringify(date)
    );
  });
  test('초기화 테스트', () => {
    const today = new Date().getDate();
    lastVisitedDateStorage.init();
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.LAST_VISITED_DATE,
      JSON.stringify(today)
    );
  });
  test('값 존재 여부 테스트', () => {
    lastVisitedDateStorage.isExist();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.LAST_VISITED_DATE);
  });
});
