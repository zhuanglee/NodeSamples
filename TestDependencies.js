const config = require('config');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const Sequelize = require('sequelize');
const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));
const redisClient = redis.createClient();
console.log('Hello world');