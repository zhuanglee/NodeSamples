var fs = require("fs");
var Q = require('q');

var readFile = function (file, encoding) {
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
};

readFile("../apk/version.json", 'utf-8')
    .then(function (data) {
        console.log(data.toString()); //data 为 Buffer 类型
    }, function (err) {
        console.error(err.toString());
    }, function (progressed) {
        console.log("progressed:" + progressed);
    });
