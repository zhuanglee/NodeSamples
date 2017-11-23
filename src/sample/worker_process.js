process.on('message',function (msg) {
    console.log('worker receive msg = ', msg);
});
process.on('SIGTERM', function () {
   console.log('Got a SIGTERM, exiting...');
   process.exit(1);
});
process.send('working');