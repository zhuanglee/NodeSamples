let basicTest = function () {
    let array = [];
    console.log(array.push(1, 'a'));// 向栈内推入两个元素
    console.log(array);
    array[3] = true;// 数组长度变为3，array[2] = undefined
    console.log("执行 array[3] = true; 之后");
    console.log("array.toString()=", array.toString());
    console.log("array.toLocaleString()=", array.toLocaleString());
    console.log("array.valueOf()=", array.valueOf());
    console.log('pop = ', array.pop());// 从栈顶弹出一个元素
    console.log('shift = ', array.shift());// 从队列头取出一个元素
    array.length = 5;// 数组长度变为5
    console.log(array.join(","));
    console.log('array.length =', array.push('last'));
    console.log('array.length =', array.unshift('first', 'second'));
    console.log(array);
    console.log(array.join(":"));
    return array;
};

/**
 * 升序
 * @param v1
 * @param v2
 * @returns {number}
 */
function asc(v1, v2) {
    if (v1 < v2) {
        return -1;
    } else if (v1 > v2) {
        return 1;
    }
    return 0;
}

/**
 * 降序
 * @param v1
 * @param v2
 * @returns {number}
 */
function desc(v1, v2) {
    if (v1 < v2) {
        return 1;
    } else if (v1 > v2) {
        return -1;
    }
    return 0;
}

function sort(array, compare) {
    if (Array.isArray(array)) {
        console.log("sort:", array.sort(compare));
        console.log("reverse:", array.reverse());
    } else {
        console.log("%s is not array", array);
    }
}

let sortTest = function (array) {
    sort(array);
    sort(array, asc);
    sort(array, desc);
};

let sliceTest = function () {
    let numbers = [1, 2, 5, 4, 10];
    console.log('\narray.slice(start,end);');
    numbers = numbers.concat([6, 7], 8);
    console.log('numbers.slice(%d)=', 0, numbers.slice(0));
    console.log('numbers.slice(%d,%d)=%s', 1, numbers.length, numbers.slice(1, numbers.length));
    console.log('numbers.slice(%d,%d)=', -numbers.length, -numbers.length / 2,
        numbers.slice(-numbers.length, -numbers.length / 2));
};

let spliceTest = function () {
    console.log('\narray.splice(start,deleteCount,items);');
    let colors = ['red', 'green', 'blue'];
    console.log("colors=", colors);
    console.log("colors.splice(1,1)=", colors.splice(1, 1));
    console.log("colors=", colors);
    console.log("colors.splice(1, 0, 'yellow', 'orange')=", colors.splice(1, 0, 'yellow', 'orange'));
    console.log("colors=", colors);
    console.log("colors.splice(1, 1, 'white','black')=", colors.splice(1, 1, 'white', 'black'));
    console.log("colors=", colors);
};

let indexOfTest = function () {
    console.log('\narray.indexOf(searchElement,fromIndex);');
    console.log('array.lastIndexOf(searchElement,fromIndex);');
    let arr = [1, 3, 5, 7, 9, 7, 5, 3, 1];
    console.log(arr);
    console.log("arr.indexOf(1)=", arr.indexOf(1));
    console.log("arr.lastIndexOf(1)=", arr.lastIndexOf(1));
    console.log("arr.indexOf(3, 2)=", arr.indexOf(3, 2));
    console.log("arr.lastIndexOf(3, 2)=", arr.lastIndexOf(3, 2));
    console.log("arr.indexOf(2)=", arr.indexOf(2));
    console.log("arr.lastIndexOf(2)=", arr.lastIndexOf(2));
};

let iterationTest = function () {
    let arr = [1, 3, 5, 7, 9, 7, 5, 3, 1];
    console.log('\n原数组：', arr);
    console.log("每个元素+1=", arr.map(function (item) {
        return item + 1;
    }));
    console.log("每一项都大于1？", arr.every(function (item) {
        return item > 1;
    }));
    console.log("是否有元素大于7？", arr.some(function (item) {
        return item > 1;
    }));
    console.log("过滤小于5的元素=", arr.filter(function (item) {
        return item > 5;
    }));
    arr.forEach(function (item, index, array) {
        console.log('item=%s,index=%d,array=%s', item, index, array);
    })
};

let reduceTest = function () {
    let arr = [1, 2, 3, 4, 5];
    console.log('\n原数组：', arr);
    let sum = arr.reduce(function (pre, cur, index, array) {
        console.log('pre=%s,cur=%s,index=%d,array=%s', pre, cur, index, array);
        return pre + cur;
    });
    console.log('sum=%d\n', sum);
    let result = arr.reduceRight(function (pre, cur, index, array) {
        console.log('pre=%s,cur=%s,index=%d,array=%s', pre, cur, index, array);
        return pre - cur;
    });
    console.log('从右向左依次相减：result=', result);
};

// 基本操作：转换方法，栈方法，队列方法
basicTest();
// 重排序方法：sort reverse
sortTest(['a', 'z', 5, 4, 10, 'A', 'Z', 96]);
sortTest([1, 2, 5, 4, 10]);
// 操作方法：concat slice
sliceTest();
// 操作方法：splice
spliceTest();
// 位置方法：indexOf lastIndexOf
indexOfTest();
// 迭代方法
iterationTest();
// 归并方法
reduceTest();

