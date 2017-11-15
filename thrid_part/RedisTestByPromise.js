const bluebird = require('bluebird');
const redis = bluebird.promisifyAll(require('redis'));
let client = redis.createClient();

async function hashTest() {

    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    await client.hmsetAsync("HH_TEST", content);

    console.log('hmsetAsync-->success');

    let obj = await client.hgetAsync("HH_TEST", "520");

    console.log('hgetAsync-->HH_TEST:520:%s', obj);

    let objs = await await client.hgetallAsync("HH_TEST");
    console.log('hgetallAsync-->');
    console.dir(objs);

    return true;
}

async function setTest() {
    return true;
}

hashTest().then(function (isSuccess) {
    console.log('isSuccess=', isSuccess);
});
