const http = require("http");

/**
 * 开启服务
 * @param ip IP地址
 * @param port 端口号
 * @param router 路由函数
 */
function start(ip, port, router) {
    function onRequest(request, response) {
        let handler = router(request);
        if (typeof handler === 'function') {
            handler(request, response);
        }
    }
    http.createServer(onRequest).listen(port, ip);
    // 打印日志
    let baseUrl = 'http://' + ip + ':' + port;
    console.log("server running at %s/", baseUrl);
}

exports.start = start;