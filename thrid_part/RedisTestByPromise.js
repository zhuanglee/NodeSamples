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

    let key = 'HH_TEST';
    await redisClient.delAsync(key);
    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    await redisClient.hmsetAsync(key, content);

    console.log('hmsetAsync-->success');

    let obj = await redisClient.hgetAsync(key, "520");

    console.log('hgetAsync-->HH_TEST:520:%s', obj);

    let objs = await await redisClient.hgetallAsync(key);
    console.log('hgetallAsync-->');
    console.dir(objs);

    return true;
}

async function listTest() {
    let key = 'listKey';
    await redisClient.delAsync(key);
    for (let i = 1; i <= 10; i++) {
        await redisClient.lpushAsync(key, 'listValue' + i);
    }
    return true;
}

async function setTest() {
    let key = 'setKey';
    await redisClient.delAsync(key);
    let arr = [];
    for (let i = 1; i <= 10; i++) {
        arr.push('setValue' + i);
    }
    for (let i = 1; i <= 10; i++) {
        arr.push('setElement' + i);
    }
    await redisClient.saddAsync(key, arr);
    let setValues = await redisClient.smembersAsync(key);
    console.log('setValues=',setValues);
    let matchResult = await redisClient.sscanAsync(key, 0, 'match', '*setElement*');
    console.log('matchResult=',matchResult);
    matchResult.forEach(function (e) {
        console.log(e)
    });
    // for(let e of matchResult){
    //     console.log(e)
    // }
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