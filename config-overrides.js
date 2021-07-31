import { override, addWebpackAlias } from "customize-cra";
import addLessLoader from "customize-cra-less-loader";
import { resolve } from "path";

export default override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        modifyVars: {
          "primary-color": "#1f29f0",
          "link-color": "#1f29f0",
          "border-radius-base": "2px",
        },
        javascriptEnabled: true,
      },
    },
  }),
  addWebpackAlias({
    "@": resolve(__dirname, "src"),
    "@components": resolve(__dirname, "src/components"),
    "@styles": resolve(__dirname, "src/styles"),
    "@pages": resolve(__dirname, "src/pages"),
    "@utils": resolve(__dirname, "src/utils"),
  }),
);
