var fs = require('fs');
var Wind = require('wind');
var WindUtil = require('./WindUtil');

var fileExistsAsync = WindUtil.TaskFromCallback(fs.exists);
var readFileAsync = WindUtil.TaskFromStandard(fs.readFile);

var task = eval(Wind.compile('async', function () {
    // $await只能用在被compile的function中
    var file = "../lib/WindUtil.js";
    var isExists = $await(fileExistsAsync(file));
    if (isExists) {
        var content = readFileAsync(file, 'utf-8');
        console.log(file + '内容：\n');
        console.log(content.toString());
        console.log(content);
    }
}));
task().start();