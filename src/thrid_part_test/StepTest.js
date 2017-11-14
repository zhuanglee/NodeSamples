const fs = require('fs');
const step = require('step');
var WindUtil = require('./WindUtil');

// 异步调用的依赖处理
function testStep() {
    return step(
        function step1() {
            console.log('step1 is read file1.txt');
            fs.readFile('../file/file1.txt', this);
        },
        function step2(err, content) {
            console.log('step2 is read file by file1.txt content');
            fs.readFile(content, this);
        },
        function step3(err, content) {
            console.log('step3 is read file by file2.txt content');
            fs.readFile(content, this);
        },
        function done(err, content) {
            console.log('done:\n' + content);
        }
    );
}

// 异步的并行执行
function testStepParallel() {
    return step(
        function readFile() {
            fs.readFile('file1.txt', this.parallel());
            fs.readFile('file2.txt', this.parallel());
            fs.readFile('file3.txt', this.parallel());
        },
        function done(err, content1, content2, content3) {
            console.log("step异步的并行执行-start");
            if (err) {
                return console.error(err);
            }
            console.log(arguments);
            console.log("step异步的并行执行-end");
        }
    );
}

// 结果分组-读取一个目录，然后迭代其中的文件
var testStepGroup = function (path) {
    return step(
        function readDir() {
            fs.readdir(path, this);
        },
        function readFiles(err, results) {
            if (err) throw err;
            // create a group
            var group = this.group();
            results.forEach(function (filename) {
                if (/\.js$/.test(filename)) {
                    fs.readFile(path + "/" + filename, group());
                }
            });
        },
        function showAll(err, fileContents) {
            console.log("-- step group start --");
            if (err) throw err;
            var fileIndex = 0;
            fileContents.forEach(function (fileContent) {
                console.log("--第"+(++fileIndex)+"个文件内容--");
                console.log(fileContent.toString());
            });
            console.log("-- step group end --");
        }
    );
};

testStep();
// testStepParallel();
// testStepGroup("../use/");
