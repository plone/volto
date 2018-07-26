module.exports = {
  server: {
    input: './src/server.jsx',
    output: './dist/server.js',
  },
  excludeFromExternals: [/^@plone\/plone-react(\/.*)?$/],
};
