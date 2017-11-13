let number = new Number(10);
console.log(number);
console.log(number.toString(2));
console.log(number.toString(8));
console.log(number.toString(10));
console.log(number.toString(16));
number = 3.1415926;
console.log(number.toFixed(2));
console.log(number.toPrecision(21));// toPrecision() argument must be between 1 and 21
number = 100000000000000000000;// 20
console.log(number.toPrecision());
console.log(number.toPrecision(3));
number = 1000000000000000000000;// 21
console.log(number.toPrecision());
console.log(number.toExponential(0));
