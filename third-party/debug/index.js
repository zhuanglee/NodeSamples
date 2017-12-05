const debug = require('debug');
const error = debug('app:error');
const log = debug('app:log');
if (!error.enabled) {
    error.enabled = true;
}
if (!log.enabled) {
    log.enabled = true;
}
// by default stderr is used
error('goes to stderr!');
// set this namespace to log via console.log
log.log = console.log.bind(console); // don't forget to bind to console!
log('goes to stdout');
error('still goes to stderr!');

// set all output to go via console.info
// overrides all per-namespace log settings
debug.log = console.info.bind(console);
error('now goes to stdout via console.info');
log('still goes to stdout, but via console.info now');

// TODO 通过设置环境变量控制 debug 开关
log('process.env.DEBUG = ', process.env.DEBUG);
let test = debug('debug:test');
test('process.env.DEBUG', process.env.DEBUG);
test = debug('debug:test2');
test('not show');