module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }]
    ],
    plugins: []
    // plugins: [
    //   "nativewind/babel",
    //   "react-native-reanimated/plugin"
    // ]
  };
};