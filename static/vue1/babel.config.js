module.exports = function(api) {
  api.cache(true);

  return {
    highlightCode:false,
    presets: [
      ['@babel/preset-env',{targets: { electron: '3.0' }}],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
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