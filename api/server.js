const proxy = require("express-http-proxy");
const { createProxyMiddleware } = require('http-proxy-middleware');
const session = require('express-session');

const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3070;

const origin = process.env.ORIGIN || "*";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.enable("trust proxy");

/*app.use(
  "/service/blibliserver",
  proxy("https://www.blibli.com", {
    proxyReqOptDecorator(proxyReqOpts) {
      proxyReqOpts.headers["Origin"] = "https://www.blibli.com";
      return proxyReqOpts;
    },
    proxyErrorHandler: function(err, res, next) {
      console.log("Proxy err", err);
      next(err);
    }
  })
)*/

/*app.get('/backend/search/products', (req, res) => {
  const json = req.query;
  request(`https://www.blibli.com/backend/search/products?searchTerm=${json.searchTerm}&start=${json.start}&itemPerPage=${json.itemPerPage}`,
    (err, res1, data) => {
      console.log(err, res1, data);
      res.json(res1);
    }, (error) => console.error(error));
});*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(
  session({
    secret: 'sacredheart',
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true,
      maxAge: 5184000000
    }
  })
);

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

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});