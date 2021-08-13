import storage from "utils/storage/storage";
import productData from "utils/productData";

// storage
export const LOCAL_STORAGE = storage(localStorage);

export const STORAGE_KEYS = {
  INTEREST_LIST: "interestList",
  RECENT_LIST: "recentList",
  LAST_VISITED_DATE: "lastVisitedDate",
};

// routes
export const ROUTES = {
  HOME: "/",
  PRODUCT: "/product",
  RECENT_LIST: "/recent-list",
};

// data
export const PRODUCT_DATA = productData.create();

export const MIN_PRODUCT_ID = 0;

export const MAX_PRODUCT_ID = PRODUCT_DATA.length;

export const UNIQUE_BRAND = productData.getUniqueBrand();

// sort

export const ORDER_BY = {
  VIEW: "view",
  PRICE: "price",
};
