import productData from '../productData';

describe('제품 데이터 테스트', () => {
  test('제품 데이터 생성 테스트', () => {
    expect(productData.create()).toEqual(
      expect.arrayContaining([
        {
          brand: '나이키',
          id: 0,
          imgUrl: '/images/image1.jpg',
          price: 30000,
          title: '중고 나이키 테아 흰검 245 30000원',
        },
      ])
    );
  });
  test('id가 일치하는 요소 탐색 테스트', () => {
    expect(productData.findById(0)).toEqual({
      brand: '나이키',
      id: 0,
      imgUrl: '/images/image1.jpg',
      price: 30000,
      title: '중고 나이키 테아 흰검 245 30000원',
    });
  });
  test('고유한 브랜드 종류 테스트', () => {
    expect(productData.getUniqueBrand()).toEqual([
      {
        label: '나이키',
        value: '나이키',
      },
      {
        label: '구찌',
        value: '구찌',
      },
      {
        label: '스톤아일랜드',
        value: '스톤아일랜드',
      },
      {
        label: '루이비통',
        value: '루이비통',
      },
      {
        label: '샤넬',
        value: '샤넬',
      },
    ]);
  });
});
