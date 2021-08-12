import { ORIGINAL_DATA } from "utils/constants/constants";

export const getUniqueBrand = () => {
  const uniqueBrand = {};
  ORIGINAL_DATA.filter(({ brand }) => {
    if (uniqueBrand[brand]) {
      return false;
    }
    uniqueBrand[brand] = true;
    return true;
  });

  return Object.keys(uniqueBrand).map((brand) => ({
    label: brand,
    value: brand,
  }));
};
