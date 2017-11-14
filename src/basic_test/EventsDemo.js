const util = require('util');
const EventEmitter = require('events').EventEmitter;
const eventBus = new EventEmitter();

// 游戏平台
function GamePlatform() {

    /**
     * 设置最大监听个数
     */
    this.setMaxListeners = eventBus.setMaxListeners;

    /**
     * 注册推送监听
     * @param pushListener 推送监听
     * @return 当前推送监听的个数
     */
    this.addPushListener = function (pushListener) {
        eventBus.on("push", pushListener);
        return EventEmitter.listenerCount(eventBus, 'push');
    };

    /**
     * 移除推送监听
     * @param pushListener 推送监听
     * @return 当前推送监听的个数
     */
    this.removePushListener = function (pushListener) {
        eventBus.removeListener("push", pushListener);
        return EventEmitter.listenerCount(eventBus, 'push');
    };

    /**
     * 推送普通消息
     * @param msg 推送的消息内容
     */
    this.push = function (msg) {
        eventBus.emit('push', msg);
    };

    /**
     * 加入游戏
     */
    this.joinGame = function (user) {
        console.log('%s playing game', user.username);
        // 活动期间玩游戏可以领取奖品，且最多只能领取一次
        eventBus.once("GameGift", function (gift) {
            console.log("%s 收到游戏奖品：%s", user.username, gift);
        });
    };

    /**
     * 推送游戏礼物
     * @param gift 游戏礼物
     */
    this.sendGameGift = function (gift) {
        eventBus.emit('GameGift', gift);
    };

    /**
     * 错误监听
     * @param err
     */
    this.errorListener = function (err) {
        if (err) {
            console.warn(err.toString());
        } else {
            console.log('未捕获到错误信息');
        }
    };

    /**
     * 处理错误
     * @param e
     */
    this.handleError = function (e) {
        eventBus.emit('error', e);
    };


    // 添加错误处理监听
    eventBus.addListener('error', this.errorListener);

}

const gamePlatform = new GamePlatform();
gamePlatform.setMaxListeners(3);

// 用户信息
function User(id, username) {
    this.id = id;
    this.username = username;
    /**
     * 推送监听
     * @param msg 推送的消息内容
     */
    this.pushListener = function (msg) {
        console.log("%s 收到推送消息：%s", username, msg);
    };
}

/**
 * 登录
 * @param time 登录时间
 */
User.prototype.login = function (time) {
    console.log('%s 登录成功，登录时间：%s', this.username, time);
    try {
        if (this.pushListener) {
            let pushListenerCount = gamePlatform.addPushListener(this.pushListener);
            console.log('在线用户数：', pushListenerCount);
        } else {
            throw new Error(this.username + ' 没有监听推送功能');
        }
    } catch (e) {
        // 测试错误处理
        gamePlatform.handleError(e);
    }
};

/**
 * 退出
 * @param time 登录时间
 */
User.prototype.logout = function (time) {
    console.log('%s 退出成功，退出时间：%s', this.username, time);
    if (this.pushListener) {
        let pushListenerCount = gamePlatform.removePushListener(this.pushListener);
        console.log('在线用户数：', pushListenerCount);
    }
};

// 定义管理员
function Admin(id, username) {
    User.call(this, id, username);
}

// Admin 继承 User 的原型
util.inherits(Admin, User);

/**
 * 测试参数
 */
let test = function () {
    const admin = new Admin(0, 'lzh');
    admin.login('11-1');
    // 模拟双十一活动
    const user1 = new User(1, "张三");
    const user2 = new User(2, "李四");
    user1.login("11-11");
    user2.login("11-11");
    gamePlatform.push('双十一，玩游戏就送五折优惠券~');
    gamePlatform.joinGame(user1);
    gamePlatform.sendGameGift('五折优惠券');
    user1.logout('11-12');


    // 模拟双十二活动
    const user3 = new User(3, "王五");
    user3.login("12-12");
    gamePlatform.push('双十二，玩游戏就送一百万美金~');
    gamePlatform.joinGame(user2);
    gamePlatform.sendGameGift('一百万美金');

    user2.logout('12-13');
    user3.logout('12-13');
    admin.logout('12-13');

    console.log(util.inspect(admin, true, null, true));
    console.log(util.inspect(user2, true, null, true));

    console.log('admin.prototype=', admin.prototype);
    console.log('admin.__proto__=', admin.__proto__);
    console.log('admin.__proto__.__proto__=', admin.__proto__.__proto__);

    let admin2 = Object.create(admin);
    console.log(admin2.constructor);
    console.log(admin2.constructor.name);
};

//执行测试
test();