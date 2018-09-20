module.exports = {
  "presets": [
    "razzle/babel",
    "stage-0"
  ],
  "plugins": [
    "transform-decorators-legacy",
    ["babel-plugin-root-import", {
      "rootPathSuffix": "src"
    }]
  ]
};
