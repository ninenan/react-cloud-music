const files = require.context('./modules', false, /\.js$/);
const api = files
  .keys()
  .reduce((module, modulePath) => {
    const value = files(modulePath).default;
    module[modulePath.match(/\w+/g)[0]] = value;

    return module;
  }, {})

export default api;