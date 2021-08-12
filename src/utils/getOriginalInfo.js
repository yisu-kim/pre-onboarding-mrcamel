import { ORIGINAL_DATA } from "utils/constants";

export const getOriginalInfo = (id) => {
  return ORIGINAL_DATA.find((data) => data.id === id);
};
