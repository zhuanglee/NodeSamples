const config = require('config');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const Sequelize = require('sequelize');
const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));
const redisClient = redis.createClient();
// 加载本地库
const commonUtil = require('common-util');
const mongodbUtil = require('mongodb-util');
const mysqlUtil = require('mysql-util');
const redisUtil = require('redis-util');
const sqlUtil = require('sql-util');
const ormUtil= require('orm-util');

// TODO 测试
console.log(commonUtil.getType(new Date()));
console.log('Hello world');