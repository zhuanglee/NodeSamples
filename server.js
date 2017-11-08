"use strict";
let config = require('config');//get config info by config library
console.log(config);
console.log('config.name = ', config.name);
console.log('platform = ', config.get("platform"));
console.log('redis.port = ', config.get("redis.port"));
