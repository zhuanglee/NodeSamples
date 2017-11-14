const util = require('util');

console.log('\nutil.isArray');
console.log(util.isArray(new Array()));
console.log(util.isArray([]));
console.log(util.isArray({}));

console.log('\nutil.isRegExp');
console.log(util.isRegExp(new RegExp('/haha/')));
console.log(util.isRegExp('/haha/'));

console.log('\nutil.isDate');
console.log(util.isDate(new Date()));
console.log(util.isDate(Date()));
console.log(util.isDate("2017-11-1"));


console.log('\nutil.isError');
console.log(util.isError(new Error('test error')));
console.log(util.isError(new TypeError()));
