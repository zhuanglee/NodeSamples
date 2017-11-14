function Goods(name, price) {
    this.name = name;
    this.price = price;
}

// for in 遍历对象属性
let goods = new Goods("iPhone X", 20000);
for (let fieldName in goods) {
    console.log(goods[fieldName]);
}

/**
 * for in 遍历数组
 * @param array
 */
function printArrayByForIn(array) {
    for (let i in array) {// i 为字符串 '0','1','2'
        console.log(array[i]);
    }
}

/**
 * for each 遍历数组
 * @param array
 */
function printArrayByForEach(array) {
    array.forEach(function (value) {
        //不能使用 break continue
        console.log(value);
    })
}

/**
 * for of 遍历数组
 * @param array
 */
function printArrayByForOf(array) {
    for (let value of array) {
        console.log(value);
    }
}

/**
 * for of 遍历 Map
 * @param map
 */
function printMapByForOf(map) {
    for (let {key, value} of map) {
        console.log("%s:%s", key, value);
    }
}

/**
 * for of 遍历 Object
 * @param obj
 */
function printObjectByForOf(obj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
        console.log("%s:%s", key, obj[key]);
    }
}

let array = [1, 3, 5, 7, 9, 7, 5, 3, 1];

console.log('\nprintArrayByForIn');
printArrayByForIn(array);

console.log('\nprintArrayByForEach');
printArrayByForEach(array);

console.log('\nprintArrayByForOf');
printArrayByForOf(array);

console.log('\n使用 for of 遍历字符串');
printArrayByForOf("abcdefg");

console.log('\n使用 for of 遍历 Set');
let set = new Set(array);
printArrayByForOf(set);

console.log('\n使用 for of 遍历 Map');
let map = new Map();
printMapByForOf(map);

console.log('\n使用 for of 遍历 Object');
printObjectByForOf(goods);



