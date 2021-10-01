<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://mrcamel.co.kr/">
    <img src="https://user-images.githubusercontent.com/37607373/133888216-450f5fa1-5211-4ffc-be5c-c0689ebbfcdf.jpg" alt="mrcamel logo" width=150 />
  </a>

  <h3 align="center">필터링/정렬 기능이 있는 상품 조회 이력 페이지</h3>
  
  <p align="center">
    프리온보딩 코스 Mr.Camel 기업 과제
    <br />
    <br />
    <a href="https://mr-camel.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/six-sense/1_mrCamel_team1">Original Team Repo</a>
  </p>
</p>

<!-- Assignment Requirements -->
<details>
  <summary>📋 과제 요구사항 보기</summary>
  <div markdown="1">

#### 기본 요구 사항

- ClassComponent 사용해서 만들어 주세요.
- SessionStorage 또는 LocalStorage 사용해서 이력을 관리해 주세요.
- 외부 API를 사용하지 않고, Client의 리소스만 사용합니다.

#### 페이지 별 상세 기능

1. 상품상세 페이지 (/product)

- 제목, 브랜드, 가격 상품 100개 json 사용
- 상품상세 조회 시 이력데이터 누적하고, 동일 상품 조회 시 최신 데이터로 갱신
- '랜덤상품 조회' 클릭 시 현 상품을 제외하고 랜덤 로드
- '관심 없음' 클릭 시 랜덤 로드하며, 현 상품은 앞으로 상품상세에서 노출되지 않음

2. 상품 조회이력 목록 페이지 (/recentList)

- 00시 기준으로 최근 조회이력과 관심 없는 상품목록 초기화
- 별도 페이징 처리 없이 전체 로드
- (목록 상단) 필터: '브랜드'(전체 및 존재하는 브랜드 목록으로 구성), 다중선택 가능
- (목록 상단) 필터: '관심 없는 상품 숨기기' 체크박스
- (선택 팝업) 정렬: 최근 조회 순, 낮은 가격 순
- 상품 클릭 시 '상품상세 페이지'로 이동, 관심 없는 상품 클릭 시 경고메세지 노출되며 이동하지 않음

#### 기대결과

1. 편리하게 Storage를 사용할 수 있는 Utils 생성
2. '최근 조회이력 목록'에서 정렬/필터의 자연스러운 갱신 처리

  </div>
</details>

## About The Project

### 상품 목록 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133924764-adbc3523-6a11-4986-b8ce-9a2eba20ac31.gif" alt="project product list page screenshot" height=600 />
</p>

### 상품 상세 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133924865-0eb496be-55d5-4fed-aff8-d8dc8b574ef1.gif" alt="project product detail page screenshot" height=600 />
</p>

### 상품 조회이력 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133924697-346915b5-841a-49c0-9f9b-93c3159e78d5.gif" alt="project recent list page screenshot" height=600 />
</p>

### Built With

- React
- React Router
- antd
- styled-components

## Getting Started

### Installation

To install packages:

```sh
npm install
```

To serve the app:

```sh
npm start
```

## Features

> 제가 개발에 참여한 기능은 ✅로 표시했습니다.

1. 상품 목록 페이지

   - 클라이언트 JSON 데이터로 상품 목록 초기화
   - ✅ 상품 클릭 시 조회 이력에 누적하고 동일 상품 클릭 시 조회 이력 최신으로 업데이트

2. 상품 상세 페이지

   - '랜덤상품 조회' 클릭 시 현 상품을 제외하고 랜덤 로드
   - '관심 없음' 클릭 시 현 상품은 앞으로 상품 목록에 노출되지 않으며 이 상품을 제외하고 랜덤 로드

3. 상품 조회이력 페이지

   - 00시 기준으로 최근 조회 이력과 관심 없는 상품 목록 초기화
   - 다중 선택 가능한 브랜드 필터 구현
   - ✅ '관심 없는 상품 숨기기' 체크박스 필터 구현
   - 최근 조회순, 낮은 가격순 정렬 선택 팝업 구현
   - ✅ 관심 없는 상품 클릭 시 경고 메시지 노출 및 이동 불가 기능

4. 공통
   - ✅ localStorage util
   - JSON data util

## Refactoring

- setInterval로 인한 불필요한 리렌더링 제거
- 00시 상품 이력 초기화 기능의 기준을 시분초에서 날짜로 변경
- constants와 utils 정리, 컴포넌트 재사용
- TypeScript로 변환

## Members

- [yisu-kim](https://github.com/yisu-kim)
- [tTab1204](https://github.com/tTab1204)
- [yh1120](https://github.com/yh1120)
- [UlongChaS2](https://github.com/UlongChaS2)
