const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // create the proxy
// /** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
// const exampleProxy = createProxyMiddleware({
//   target: 'http://www.example.org/api', // target host with the same base path
//   changeOrigin: true, // needed for virtual hosted sites
// });

// // mount `exampleProxy` in web server
// app.use('/api', exampleProxy);
// app.listen(3000);

module.exports = function(root){
  root.use(
    '/api',
    createProxyMiddleware({
      target:'http://localhost:4000',
      changeOrigin:true,
      secure:false,
      header:{
        'Access-Control_Allow_origin':"http://localhost:5173"
      }
    })
  )
}