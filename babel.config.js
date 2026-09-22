module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // jsxImportSource tells Babel to use NativeWind's JSX runtime, which
      // is how className props get compiled to StyleSheet calls at build time.
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      // reanimated/plugin must always be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};
