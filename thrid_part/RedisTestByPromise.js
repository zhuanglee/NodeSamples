const redis = require('bluebird')
    .promisifyAll(require('redis'))
    .createClient();


async function stringTest() {
    for (let i = 1; i <= 3; i++) {
        let key = 'TEST_STRING_' + i;
        let val = 'value' + i;
        console.log('set %s %s =', key, val, await redis.setAsync(key, val));
        console.log('get %s =', key, await redis.getAsync(key));
    }
    return true;
}

async function hashTest() {
    let key = 'TEST_HASH';
    console.log('del %s =', key, await redis.delAsync(key));
    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    console.log('hmsetAsync =', await redis.hmsetAsync(key, content));

    let obj = await redis.hgetAsync(key, "520");

    console.log('hget HH_TEST 520\n', obj);

    let objs = await await redis.hgetallAsync(key);
    console.log('hgetall %s\n', key);
    console.dir(objs);
    console.log('hgetall randomKey\n', await redis.hgetallAsync('randomKey'));
    return true;
}

async function listTest() {
    let key = 'TEST_LIST';
    console.log('del %s =', key, await redis.delAsync(key));
    for (let i = 1; i <= 10; i++) {
        await redis.lpushAsync(key, 'listValue' + i);
    }
    return true;
}

async function setTest() {
    let key = 'TEST_SET';
    console.log('del %s =', key, await redis.delAsync(key));
    let arr = [];
    for (let i = 1; i <= 5; i++) {
        arr.push('setValue' + i);
    }
    for (let i = 6; i <= 10; i++) {
        arr.push('setElement' + i);
    }
    console.log('saddAsync =', await redis.saddAsync(key, arr));
    console.log('smembersAsync =', await redis.smembersAsync(key));
    console.log('sscanAsync =', await redis.sscanAsync(key, 0, 'match', '*setElement*'));
    return true;
}

async function zsetTest() {
    let key = 'TEST_ZSET';
    console.log('del %s =', key, await redis.delAsync(key));
    let now = Date.now();
    for (let i = 16; i >= 1; i--) {
        // key score value
        await redis.zaddAsync(key, now - i * 1000, 'val' + i);
    }
    // 删除13秒之前的数据
    await redis.zremrangebyscoreAsync(key, '-inf', now - 13000);
    // 获取第一个，此时为第14秒存入的数据
    let first = await redis.zrangeAsync(key, 0, 0, 'WithScores');
    console.log(first, Array.isArray(first), first.length);// first = [value, score]
    // 获取总个数 和 某时间段的数据个数
    let size = await redis.zcardAsync(key);
    let count = await redis.zcountAsync(key, now - 5000, now);
    console.log('size=', size, 'count', count);
    // 获取某时间段的数据
    let result = await redis.zrangebyscoreAsync(key, now - 6000, now - 4000, 'WithScores');
    console.log(result, Array.isArray(result), result.length);
}

async function test() {
    await stringTest();
    await hashTest();
    await listTest();
    await setTest();
    await zsetTest();
    await redis.quit();
}

test();