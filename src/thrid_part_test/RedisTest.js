let moment = require('moment');
let client = require('redis').createClient();
client.auth('', function () {// password is empty
    console.log('auth success');
});
client.on('ready', function () {
    console.log('ready:%s', moment());
    onReady();
});

function onReady() {

    let content = {a: 1, 'b': '2', "c": "3", d: true};
    content[520] = 1314;
    content[1314] = 520;

    console.log(content);

    client.hmset("HH_TEST", content, function () {
        console.log('hmset->', arguments);
    });

    client.hget("HH_TEST", "520", function (err, obj) {
        console.log('hget->HH_TEST:520:%s', obj);
    });

    client.hgetall("HH_TEST", function (err, obj) {
        console.log('hgetall-->');
        console.dir(obj);
    });

    console.log('end?');
}

