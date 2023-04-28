// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://sandbox.safaricom.co.ke',
        changeOrigin: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }));
};