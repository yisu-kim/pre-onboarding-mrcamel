import storage from "utils/storage/storage";
import { getOriginalData } from "utils/getOriginalData";
import { getInterestList } from "utils/getInterestList";

// storage
export const LOCAL_STORAGE = storage(localStorage);

export const INTEREST_LIST_KEY = "interestList";

export const RECENT_LIST_KEY = "recentList";

// routes
export const ROUTES = {
  HOME: "/",
  PRODUCT: "/product",
  RECENT_LIST: "/recent-list",
};

// data
export const ORIGINAL_DATA = getOriginalData();

export const MIN_PRODUCT_ID = 0;

export const MAX_PRODUCT_ID = ORIGINAL_DATA.length;

export const INTEREST_LIST = getInterestList(MAX_PRODUCT_ID);
