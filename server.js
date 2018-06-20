"use strict";
//get config info by config library
const config = require('config');
const httpServer = require('./src/app/http_server');
const route = require('./src/app/router').route;
// 打印环境变量
console.log("\nprocess.env.NODE_ENV = %s", process.env.NODE_ENV);
console.log("process.env.CONFIG_FILE = %s", process.env.CONFIG_FILE);
console.log(process.pid);
console.log(process.memoryUsage());
// 打印配置信息
console.log(config);
// 启动网络监听
httpServer.start(config.get('http.host'), config.get('http.port'), route);