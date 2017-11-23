const redis = require('bluebird')
    .promisifyAll(require('redis'))
    .createClient();


async function stringTest() {
    for (let i = 1; i <= 3; i++) {
        await redis.setAsync('stringkey' + i, 'value' + i);
        console.log(await redis.getAsync('stringkey' + i));
    }
    return true;
}

async function hashTest() {

    let key = 'HH_TEST';
    await redis.delAsync(key);
    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    await redis.hmsetAsync(key, content);

    console.log('hmsetAsync-->success');

    let obj = await redis.hgetAsync(key, "520");

    console.log('hgetAsync-->HH_TEST:520:%s', obj);

    let objs = await await redis.hgetallAsync(key);
    console.log('hgetallAsync-->');
    console.dir(objs);
    let result = await await redis.hgetallAsync('randomKey');
    console.log('randomKey=', result);
    return true;
}

async function listTest() {
    let key = 'listKey';
    await redis.delAsync(key);
    for (let i = 1; i <= 10; i++) {
        await redis.lpushAsync(key, 'listValue' + i);
    }
    return true;
}

async function setTest() {
    let key = 'setKey';
    await redis.delAsync(key);
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
    let key = 'zsetKey';
    await redis.delAsync(key);
    let now = Date.now();
    for (let i = 1; i <= 16; i++) {
        // key score value
        await redis.zaddAsync(key, now + i * 1000, 'val' + i);
    }
    // 删除13秒之前的数据
    await redis.zremrangebyscoreAsync(key, '-inf', now + 17000);
    // 获取第一个，此时为第14秒存入的数据
    let first = await redis.zrangeAsync(key, 0, 0, 'WithScores');
    console.log(first, Array.isArray(first), first.length);// first = [value, score]
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