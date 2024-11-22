module.exports = {
  env: {
    node: true,
    "react-native/react-native": true,
  },
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      "babel-module": {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        paths: ["node_modules"],
      },
    },
  },
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
