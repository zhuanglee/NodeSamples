const LEVELS = ['Debug', 'Info', 'Warning', 'Error'];

class Log {
    constructor() {
        this.level = 1;
    }

    _formatLog(type, tag, ...messages) {
        if (LEVELS.indexOf(type) >= this.level) {
            console.log(`[${type}] ${tag}: ${messages.join('|')}`);
        }
    };

    d(source, ...msgs) {
        this._formatLog('Debug', source, ...msgs);
    }

    i(source, ...msgs) {
        this._formatLog('Info', source, ...msgs);
    }

    w(source, ...msgs) {
        this._formatLog('Warning', source, ...msgs);
    }

    e(source, ...msgs) {
        this._formatLog('Error', source, ...msgs);
    }

    /**
     * 设置日志级别，默认为1，即info
     * @param level
     */
    setLevel(level) {
        if (level >= 0 && level <= 3) {
            this.level = level;
        } else {
            throw new Error('level out of range(0, 3)');
        }
    }

}

module.exports = new Log();

function test(){
    let log = new Log();
    log.setLevel(2);
    log.d('log', 'this is debug message');
    log.i('log', 'this is info message');
    log.w('log', 'this is warning message');
    log.e('log', 'this is error message');
}
test();
