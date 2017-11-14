console.time('runningTime');

process.on('exit', function (code) {

    // 以下代码永远不会执行
    setTimeout(function () {
        console.log("该代码不会执行");
    }, 0);

    console.log('退出码为:', code);
});

// 系统平台相关
console.log("系统平台相关\n", process.platform + ' ' + process.arch);
// console.log(process.env);

// node相关
console.log("node相关\n", process.execPath + ' ' + process.version);
// console.log(process.versions);
// console.log(process.config);

// 进程相关
console.log("pid = ", process.pid);
console.log("title = ", process.title);
console.log('当前进程工作目录：', process.cwd());
console.log(process.mainModule);
console.log("参数个数：%d\n参数列表：%s", process.argv.length, process.argv);
console.log('memoryUsage = ', process.memoryUsage());

console.timeEnd('runningTime');
process.exit(5);
console.log("程序执行结束");