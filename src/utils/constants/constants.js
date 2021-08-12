import storage from "utils/storage/storage";
import { createProductList, getUniqueBrand } from "utils/product";
import { getInterestList } from "utils/interestList";

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
export const PRODUCT_DATA = createProductList();

export const MIN_PRODUCT_ID = 0;

export const MAX_PRODUCT_ID = PRODUCT_DATA.length;

export const INTEREST_LIST = getInterestList(MAX_PRODUCT_ID);

export const UNIQUE_BRAND = getUniqueBrand();
