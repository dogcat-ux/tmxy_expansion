const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //     '/apc',
  //     createProxyMiddleware({
  //       //  "proxy": "http://139.9.196.99:3000/",
  //       target: 'https://api.map.baidu.com/',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/apc': '',
  //       }
  //     })
  // );
  app.use(
      '/api',
      createProxyMiddleware({
        //  "proxy": "http://139.9.196.99:3000/",
        // target: 'http://139.9.196.99:3000/',
        target: 'http://1.12.252.83:3000/',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/apl': '',
        // }
      })
  );
};
