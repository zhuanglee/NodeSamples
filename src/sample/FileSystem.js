const fs = require('fs');
const zlib = require('zlib');

/**
 * 列出指定目录下的文件信息
 * @param path
 */
function ls(path) {
    fs.readdir(path, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            console.log(file)
        })
    })
}

/**
 * 删除指定文件
 * @param path
 */
function deleteFile(path) {
    fs.unlink(path, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("%s 文件删除成功！", path);
    });
}

/**
 * 读文件
 * @param path
 * @param encoding
 * @param callback 两个参数：err,buf
 */
function readFile(path, encoding, callback) {
    console.log('readFile:path=%s,encoding=%s', path, encoding);
    let chunks = [];
    let size = 0;
    let readStream = fs.createReadStream(path, encoding);
    readStream.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });
    readStream.on('end', function () {
        let buf = Buffer.concat(chunks, size);
        callback(null, buf);
    });
    readStream.on('error', function (err) {
        callback(err, null);
    });
}

/**
 * 写文件
 * @param path
 * @param data
 * @param encoding
 * @param callback
 */
function writeToFile(path, data, encoding, callback) {
    console.log('writeToFile:path=%s,encoding=%s', path, encoding);
    let writeStream = fs.createWriteStream(path);
    writeStream.write(data, encoding);
    writeStream.end();
    writeStream.on('finish', function () {
        callback(null, "write data to '" + path + "' finish.");
    });
    writeStream.on('error', function (err) {
        callback(err, null);
    });
}

// 管道实现文件复制
function copy(src, target) {
    fs.createReadStream(src)
        .pipe(fs.createWriteStream(target));
}

// 压缩
function gzip(src, target) {
    if (!target)
        target = src + ".gz";
    try {
        fs.createReadStream(src)
            .pipe(zlib.createGzip())
            .pipe(fs.createWriteStream(target));
        console.log(src + " 成功压缩到 " + target);
    } catch (e) {
        console.log(e);
    }
}


// 解压
function unzip(src, target) {
    if (!target)
        target = src.substr(0, src.length - 3);
    try {
        fs.createReadStream(src)
            .pipe(zlib.createUnzip())
            .pipe(fs.createWriteStream(target));
        console.log(src + " 成功解压到 " + target);
    } catch (e) {
        console.log(e);
    }
}

exports.ls = ls;
exports.deleteFile = deleteFile;
exports.copy = copy;
exports.gzip = gzip;
exports.unzip = unzip;
exports.writeToFile = writeToFile;
exports.readFile = readFile;

