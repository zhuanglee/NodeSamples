const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));
let redisClient = redis.createClient();


async function stringTest() {
    for (let i = 1; i <= 10; i++) {
        await redisClient.setAsync('key' + i, 'value' + i);
        console.log(await redisClient.getAsync('key' + i));
        // await redisClient.del
    }
    return true;
}

async function hashTest() {

    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    await redisClient.hmsetAsync("HH_TEST", content);

    console.log('hmsetAsync-->success');

    let obj = await redisClient.hgetAsync("HH_TEST", "520");

    console.log('hgetAsync-->HH_TEST:520:%s', obj);

    let objs = await await redisClient.hgetallAsync("HH_TEST");
    console.log('hgetallAsync-->');
    console.dir(objs);

    return true;
}

async function listTest() {
    for (let i = 1; i <= 10; i++) {
        await redisClient.lpushAsync('listKey', 'listValue'+i);
    }
    return true;
}

async function setTest() {
    for (let i = 1; i <= 10; i++) {
        await redisClient.saddAsync('setKey', 'setValue'+i);
    }
    let setValues = await redisClient.smembersAsync('setKey');
    console.log(setValues);
    return true;
}

async function test() {
    await stringTest();
    await hashTest();
    await listTest();
    await setTest();
    await redisClient.quit();
}

test();