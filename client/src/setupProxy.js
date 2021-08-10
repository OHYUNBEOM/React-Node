const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {//해당 File 에서는 Proxy 설정을 통해 Port 3000과 5000의 Request/Response 을 가능케함
    app.use(
    '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
            })
    );
};