console.time("syncRunningTime");
console.log("setImmediate属于check观察者，process.nextTick属于idle观察者;\n在每一个轮循环检查中，idle观察者先于I/O观察者，I/O观察者先于check观察者");

process.nextTick(function () {
    console.log("nextTick1");
});

setImmediate(function () {
    console.log("setImmediate1");
    process.nextTick(function () {
        console.log("nextTick in setImmediate");
    });
});

setImmediate(function () {
    console.log("setImmediate2");
});

process.nextTick(function () {
    console.log("nextTick2");
});


let timeout = setTimeout(function () {
    console.log("setTimeout1");
}, 10000);

setTimeout(function () {
    clearTimeout(timeout);
    console.log("在setTimeout2中清除setTimeout1");
    console.trace();
}, 6000);

/**
 * 周期性执行任务
 * @param times 执行次数
 * @param delay 延时
 * @param fn 任务函数(目前仅支持执行无参函数)
 */
function executeInterval(times, delay, fn) {
//只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。
    let timer = 0;
    console.assert(typeof fn === 'function', 'fn is not function');
    const intervalId = setInterval(function () {
        timer++;
        fn(timer);//目前仅支持执行无参函数
        if (times === timer) {
            clearInterval(intervalId);
        }
    }, delay);
}

executeInterval(3, 1000, function (index) {
    console.log("第%d次执行周期任务", index);
});

console.timeEnd("syncRunningTime");
