const events = require('events');
const util = require('util');

const Promise = function () {
    events.EventEmitter.call(this);
};
util.inherits(Promise, events.EventEmitter);// Promise 继承 events

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    }
    if (typeof fulfilledHandler === 'function') {
        this.once('error', errorHandler);
    }
    if (typeof fulfilledHandler === 'function') {
        this.on('progress', progressHandler);
    }
    return this;
};

const Deferred = function () {
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
    this.state = 'rulfilled';
    this.promise.emit('success', obj);
};

Deferred.prototype.reject = function (err) {
    this.state = 'failed';
    this.promise.emit('error', err);
};

Deferred.prototype.progress = function (progress) {
    this.promise.emit('progress', progress);
};

/**
 * <p>
 promisify(res).then(function () {
        // done
    }, function (err) {
        // error
    }, function (chunk) {
        //progress
        console.log('body:' + chunk);
    });
 * </p>
 * @param res
 * @returns {Promise}
 */
exports.promisify = function (res) {
    let deferred = new Deferred();
    let result = "";
    res.on('data', function (chunk) {
        result += chunk;
        deferred.progress(chunk);
    });
    res.on('end', function () {
        deferred.resolve(result);
    });
    res.on('error', function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};
