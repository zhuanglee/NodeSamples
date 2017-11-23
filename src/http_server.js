const http = require("http");

/**
 * 开启服务
 * @param host 主机地址（域名或IP）
 * @param port 端口号
 * @param route 路由函数
 */
function start(host, port, route) {
    function onRequest(request, response) {
        let handler = route(request);
        if (typeof handler === 'function') {
            handler(request, response);
        }else{
            throw new Error('handler is not function');
        }
    }
    http.createServer(onRequest).listen(port, host);
    // 打印日志
    let baseUrl = 'http://' + host + ':' + port;
    console.log("server running at %s/", baseUrl);
}

exports.start = start;