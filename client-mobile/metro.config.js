const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url.startsWith('/api')) {
        req.url = req.url.replace('/api', '');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
