import { STORAGE_KEYS } from 'utils/constants/constants';
import recentListStorage, { RecentItem } from '../recentList';

const setItem = jest.spyOn(Storage.prototype, 'setItem');
const getItem = jest.spyOn(Storage.prototype, 'getItem');

describe('lastVisitedDate 로컬스토리지 테스트', () => {
  test('get 테스트', () => {
    recentListStorage.get();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.RECENT_LIST);
  });
  test('set 테스트', () => {
    const recentList = [
      { id: 1, dislike: true },
      { id: 2, dislike: false },
    ];
    recentListStorage.set(recentList);
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.RECENT_LIST,
      JSON.stringify(recentList)
    );
  });
  test('초기화 테스트', () => {
    const recentList: RecentItem[] = [];
    recentListStorage.init();
    expect(setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.RECENT_LIST,
      JSON.stringify(recentList)
    );
  });
  test('값 존재 여부 테스트', () => {
    recentListStorage.isExist();
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEYS.RECENT_LIST);
  });
});
