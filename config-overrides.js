const rewireMobX = require('react-app-rewire-mobx');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const {injectBabelPlugin} = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {

  config = injectBabelPlugin("react-hot-loader/babel",config)

  config = rewireMobX(config, env);
  config = rewireReactHotLoader(config, env);
  return config;
}
