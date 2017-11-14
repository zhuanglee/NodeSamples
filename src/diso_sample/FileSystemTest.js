const fileSystem = require('./FileSystem');

let copyFilePath = __filename + '.copy';
let gzFilePath = copyFilePath + '.gz';
let unzipFilePath = copyFilePath + '.unzip';
let outFilePath = __filename + '.out';

fileSystem.ls('./');
fileSystem.deleteFile(copyFilePath);
fileSystem.deleteFile(gzFilePath);
fileSystem.deleteFile(unzipFilePath);
fileSystem.deleteFile(outFilePath);
fileSystem.ls('./');
fileSystem.copy(__filename, copyFilePath);
fileSystem.gzip(copyFilePath, gzFilePath);
fileSystem.unzip(gzFilePath, unzipFilePath);
// 将解压文件地址写入 outFilePath 指定的文件中
fileSystem.writeToFile(outFilePath, unzipFilePath, 'utf8',
    function (err, msg) {
        if (err)
            return console.error(err.stack);
        console.log(msg);
        // 读取刚写入的内容
        fileSystem.readFile(outFilePath, 'utf8', function (err, data) {
            if (err)
                return console.error(err.stack);
            console.log(data);
        });
    });

