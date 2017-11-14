const util = require("util");
const url = require("url");
// const queryString = require('querystring');
const fs = require("fs");

/**
 * 路由
 * @param req 请求
 * @returns {*} 处理请求的函数（必传 req 和 response 参数）
 */
function route(req) {
    if(!req){
        throw new Error("req is null");
    }
    let pathname = url.parse(req.url).pathname;
    console.log("About to route a request for " + pathname);
    pathname = pathname.substr(1);
    if ('' === pathname) {
        return index;
    } else if('login' === pathname){
        return login;
    } else {
        return showPage;
    }
}

/**
 * 断言参数是否完整
 * @param request
 * @param response
 */
function assert(request, response) {
    if(!(request && response)){
        throw new Error("参数不完整：必传 request 和 response 参数");
    }
}

/**
 * 获取Post请求体
 * @param request
 * @param callback 回调函数callback(err, body)
 */
function getPostBody(request, callback) {
    if(!callback || 'function' !== typeof callback){
        throw new Error("callback is null");
    }
    if(!request){
        callback(new Error("request is null"));
    }
    let body = '';
    request.on('data', function (chunk) {
        body += chunk;
    });
    request.on('end', function () {
        callback(null, body);
    });
}

/**
 * 显示页面(TODO 目前所有文件都会直接返回，非常危险)
 * @param request
 * @param response
 */
function showPage(request, response) {
    assert(request, response);
    console.log('showPage');
    // 从文件系统中读取请求的文件内容
    let pathname = __dirname + url.parse(request.url).pathname;
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.error(err);
            show404Page(request, response);
        }else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    });
}

/**
 * 显示404页面
 * @param request
 * @param response
 */
function show404Page(request, response) {
    assert(request, response);
    console.log('show404Page');
    response.writeHead(202, {"Content-Type": "text/plain"});
    response.write("404 not found\n");
    response.write(util.inspect(url.parse(request.url, true)));
    response.end();
}

/**
 * 首页
 * @param request
 * @param response
 */
function index(request, response) {
    assert(request, response);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World\n");
    response.write(util.inspect(url.parse(request.url, true)));
    response.end();
}

/**
 * 登录
 * @param request
 * @param response
 */
function login(request, response) {
    assert(request, response);
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    let params = url.parse(request.url, true).query;
    if(params && params.username && params.password){
        console.log('return login info');
        let username = params.username;
        let password = params.password;
        response.write('\nusername = ' + username
            + "<br/>password = " + password);
        response.end();
    }else{
        getPostBody(request, function (err, body) {
            if(body){
                response.write(body);
            }else{
                response.write(fs.readFileSync(__dirname + '/login.html'));
            }
            response.end();
        })
    }
}

exports.route = route;