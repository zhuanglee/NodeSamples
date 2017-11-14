let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz);

let [, , third] = ["foo", "bar", "baz"];
console.log(third);

let [x, , y] = [1, 2, 3];
console.log(x, y);

let [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);

[x, y, ...tail] = ['a'];
console.log(x, y, tail);

[x, y] = [1];// y = undefined
console.log(x, y);

[x, y = 2] = [1];// 为y设置默认值
console.log(x, y);

let [a, b, c] = new Set(['a', 'b', 'c']);
console.log(a, b, c);

let {name = 'lzh', pwd = name} = {name: 'abc'};
console.log(name, pwd);

/**
 * 交换数据
 * @param a
 * @param b
 * @returns {[b,a]}
 */
function swipe([a, b]) {
    return [b,a];
}
console.log(swipe([1,2]));

function printMap() {
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
        console.log(key + " is " + value);
    }
}
printMap();