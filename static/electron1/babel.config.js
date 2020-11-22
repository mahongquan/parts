module.exports = function(api) {
  api.cache(true);

  return {
    highlightCode:false,
    presets: [
      ['@babel/preset-env',{targets: { electron: '5.0' }}],
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-syntax-jsx',
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-transform-react-display-name',
      ['@babel/plugin-proposal-class-properties', { "loose": true}],
      '@babel/plugin-transform-react-jsx-self',
      '@babel/plugin-transform-react-jsx-source',
      '@babel/plugin-transform-flow-strip-types',
      "@babel/plugin-proposal-export-default-from",
      '@babel/plugin-proposal-export-namespace-from',
      "@babel/plugin-proposal-logical-assignment-operators",
      ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
      ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
      ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
      "@babel/plugin-proposal-do-expressions",
      ]
  };
};
