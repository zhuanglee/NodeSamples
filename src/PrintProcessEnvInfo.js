"use strict";
// 打印package.json中的信息
console.log("\nprocess.env.npm_package_name = %s", process.env.npm_package_name);
console.log("process.env.npm_package_version = %s", process.env.npm_package_version);
console.log("process.env.npm_package_scripts_devEnv = %s", process.env.npm_package_scripts_devEnv);
// 打印环境变量
console.log("\nprocess.env.NODE_ENV = %s", process.env.NODE_ENV);
console.log("process.env.CONFIG_FILE = %s", process.env.CONFIG_FILE);
