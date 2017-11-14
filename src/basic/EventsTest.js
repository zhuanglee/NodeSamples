const EventEmitter = require('events').EventEmitter;
const stream = new EventEmitter();

stream.on("start", function () {
    console.log("stream start");
});

stream.on("progress", function (progress) {
    console.log("stream progress is " + progress);
});

stream.on("end", function () {
    console.log("stream end");
});

stream.emit("start");
let progress = 0;
let interval = setInterval(function () {
    if (progress > 3) {
        clearInterval(interval);
        stream.emit("end");
        return;
    }
    stream.emit('progress', progress);
    progress++;
}, 1000);
