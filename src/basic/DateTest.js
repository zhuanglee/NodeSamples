
let createDateTest = function () {
    console.log("new Date('2017-11-11T21:14:21.520') =",
        new Date('2017-11-11T21:14:21.520'));
    console.log("new Date(2017, 12, 12, 12, 73, 81, 520) =",
        new Date(2017, 12, 12, 12, 73, 81, 520));
    console.log("new Date(Date.UTC(2017, 12, 12, 12, 73, 81, 520)) =",
        new Date(Date.UTC(2017, 12, 12, 12, 73, 81, 520)));
    console.log("new Date(Date.parse('May 5,2017')) =",
        new Date(Date.parse('May 5,2017')));
};

createDateTest();

let now = new Date();
console.log('now = ', now);
console.log('now.toDateString() = ', now.toDateString());
console.log('now.toTimeString() = ', now.toTimeString());
console.log('now.toLocaleDateString() = ', now.toLocaleDateString());
console.log('now.toLocaleTimeString() = ', now.toLocaleTimeString());
console.log('now.toUTCString() = ', now.toUTCString());

console.log('Date.now() = ', Date.now());
console.log('+now = ', +now);
console.log('now.getTime() = ', now.getTime());
console.log('now.valueOf() = ', now.valueOf());
console.log('now.getMilliseconds() = %d毫秒', now.getMilliseconds());
console.log('now.getTimezoneOffset() = %d分钟', now.getTimezoneOffset());


