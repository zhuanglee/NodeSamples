const util = require('util');
let obj = {a: 1, b: '2'};

/**
 * 循环执行某函数
 * @param len 次数
 * @param fn 被多次执行的函数
 * @param ctx 函数上下文
 */
function duff(len, fn, ctx) {
    let iterations = Math.floor(len / 8);
    let leftover = len % 8;
    let i = 0;
    if (leftover > 0) {
        do {
            fn.call(ctx, i++);
        } while (--leftover > 0);
    }
    do {
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
        fn.call(ctx, i++);
    } while (--iterations > 0);
}

/**
 * 循环执行某函数
 * @param data 待处理的数据，必须为数组
 * @param processFn 处理数据的函数
 * @param ctx 函数上下文
 */
function duff2(data, processFn, ctx) {
    if (!Array.isArray(data)) {
        throw new Error('data is not array');
    }
    if (!util.isFunction(processFn)) {
        throw new Error('processFn is not function');
    }
    let iterations = Math.floor(data.length / 8);
    let leftover = data.length % 8;
    let i = 0;
    if (leftover > 0) {
        do {
            processFn.call(ctx, data[i++]);
        } while (--leftover > 0);
    }
    do {
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
        processFn.call(ctx, data[i++]);
    } while (--iterations > 0);
}

function sum(data) {
    let sum = 0;
    let iterations = Math.floor(data.length / 8);
    let leftover = data.length % 8;
    let i = 0;
    if (leftover > 0) {
        do {
            sum += data[i++];
        } while (--leftover > 0);
    }
    do {
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
        sum += data[i++];
    } while (--iterations > 0);
    return sum;
}

function test1(len) {
    let data = [];
    for (let i = 0; i < len; i++) {
        data.push(obj.a + (+obj.b));
    }
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    console.log('sum =', sum);
}

function test2(len) {
    let data = [];
    for (let i = len - 1; i >= 0; i--) {
        data.push(obj.a + (+obj.b));
    }
    let sum = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        sum += data[i];
    }
    console.log('sum =', sum);
}

function test3(len) {
    let data = [];
    let i = len - 1;
    if (i > -1) {
        do {
            data.push(obj.a + (+obj.b));
        } while (--i >= 0);
    }
    let sum = 0;
    i = data.length - 1;
    if (i > -1) {
        do {
            sum += data[i];
        } while (--i >= 0);
    }
    console.log('sum =', sum);
}

function test4(len) {
    let data = [];
    let i = len - 1;
    if (i > -1) {
        do {
            data.push(obj.a + (+obj.b));
        } while (--i >= 0);
    }
    console.log('sum =', sum(data));
}

function test5(len) {
    let data = [];
    duff(len, function (i) {
        data.push(obj.a + (+obj.b));
    });
    let sum = 0;
    duff(len, function (i) {
        sum += data[i];
    });
    // duff2(data, function (data) {
    //    sum+=data;
    // });
    console.log('sum =', sum);
}

function test6(len) {
    let data = [];
    duff(len, function (i) {
        data.push(obj.a + (+obj.b));
    });
    let sum = 0;
    data.forEach(function (data) {
        sum += data;
    });
    console.log('sum =', sum);
}

function test7(len) {
    let data = [];
    duff(len, function (i) {
        data.push(obj.a + (+obj.b));
    });
    let sum = 0;
    for (let d of data) {
        sum += d;
    }
    console.log('sum =', sum);
}

/**
 * 统计函数执行时间
 * @param fn
 * @param ctx
 */
function timerFn(fn, ctx) {
    console.time(fn.name);
    fn.call(ctx, Array.prototype.slice.call(arguments, 1));
    console.timeEnd(fn.name);
}

function finalTest() {
    const len = 10000000;
    timerFn(test1, len);
    timerFn(test2, len);
    timerFn(test3, len);
    timerFn(test4, len);
    timerFn(test5, len);
    timerFn(test6, len);
    timerFn(test7, len);
}

let i = 3;
do {
    finalTest();
    console.log('\n');
} while (--i >= 0);