const { override, addWebpackAlias } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");
const path = require("path");

module.exports = override(
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
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
  }),
);
