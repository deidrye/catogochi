const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Добавляем настройки прокси
  config.devServer = {
    ...config.devServer,
    proxy: {
      '/api': {
        target: `http://${env.CLIENT_IP}:3000`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
      },
      '/ws': { ws: true, target: `http://${env.CLIENT_IP}:3000`, rewriteWsOrigin: true },
    },
  };

  return config;
};
