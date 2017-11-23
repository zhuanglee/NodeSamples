const cp = require('child_process');
let worker = cp.fork(__dirname + '/worker_process.js');
worker.on('message',function (msg) {
    console.log('main receive msg = ', msg);
    process.kill(worker.pid, 'SIGTERM');
});
worker.on('exit',function () {
   console.log('work process exit');
});
worker.on('close',function () {
   console.log('work process close');
});
worker.on('disconnect',function () {
   console.log('work process disconnect');
});
worker.on('error',function () {
   console.log('work process error');
});
worker.send('start work');