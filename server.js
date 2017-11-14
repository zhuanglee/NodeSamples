"use strict";
//get config info by config library
const config = require('config');
const service = require('./src/service');
const route = require('./src/router').route;
// 打印环境变量
console.log("\nprocess.env.NODE_ENV = %s", process.env.NODE_ENV);
console.log("process.env.CONFIG_FILE = %s", process.env.CONFIG_FILE);
// 打印配置信息
console.log(config);
console.log('config.name = ', config.name);
console.log('platform = ', config.get("platform"));
console.log('redis.port = ', config.get("redis.port"));
// 启动网络监听
service.start('localhost', 3000, route);