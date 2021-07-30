import storage from "./storage";
import { getOriginalData } from "./getOriginalData";

export const LOCAL_STORAGE = storage(localStorage);

export const originalData = getOriginalData();
