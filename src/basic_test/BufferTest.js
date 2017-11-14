function testBufferEncoding() {
    const buf = new Buffer(26);
    for (let i = 0; i < 26; i++) {
        buf[i] = i + 97;
    }

    console.log(buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
    console.log(buf.toString('ascii', 0, 5));   // 输出: abcde
    console.log(buf.toString('utf8', 5, 10));    // 输出: abcde
    console.log(buf.toString(undefined, 10, 15)); // 使用 'utf8' 编码, 并输出: abcde

}

function readFileByBuffer() {
    const fs = require("fs");
    const buf = new Buffer(200);

    console.log("准备打开", __filename);
    fs.open(__filename, 'r+', function (err, fd) {
        if (err) {
            return console.log(err);
        }
        console.log("文件打开成功！");
        console.log("开始读取文件内容：");
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            console.log('%d字节被读取', bytes);

            // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }
            // 关闭文件
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("文件关闭成功！");
            });
        });
    });
}

testBufferEncoding();
readFileByBuffer();