const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  var cookie;
  function relayRequestHeaders(proxyReq, req) {
    proxyReq.setHeader('Origin', 'https://www.blibli.com');
    if (cookie) {
      proxyReq.setHeader('cookie', cookie);
    }
  };

  function relayResponseHeaders(proxyRes, req, res) {
    var proxyCookie = proxyRes.headers["set-cookie"];
    if (proxyCookie) {
      cookie = proxyCookie;
    }
  };

  app.use(
    createProxyMiddleware(
      '/service/blibliserver',
      {
        target: 'https://www.blibli.com',
        pathRewrite: {
          '^/service/blibliserver': '', // rewrite path
        },
        changeOrigin: true,
        onProxyReq: relayRequestHeaders,
        onProxyRes: relayResponseHeaders
      }
    )
  );
};