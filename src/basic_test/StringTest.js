let str = String.fromCharCode(32, 104, 101, 108, 108, 111);
str = str.concat(' ', 'WORLD', ' ! ');
console.log('str = ', str);
console.log('str.length = ', str.length);
console.log('str.trim().length = ', str.trim().length);
console.log(str.charAt(1));
console.log(str.charCodeAt(str.length - 1));
console.log('str[0] = ', str[0]);
console.log('str.slice(3,4) = ', str.slice(3, 4));
console.log('str.substring(3, 4) = ', str.substring(3, 4));
console.log('str.substr(3, 4) = ', str.substr(3, 4));
console.log('str.indexOf(\'W\') =', str.indexOf('W'));
console.log('str.indexOf(\'w\') =', str.indexOf('w'));
console.log('str.lastIndexOf(\'E\') =', str.lastIndexOf('E'));
console.log('str.lastIndexOf(\'e\') =', str.lastIndexOf('e'));
console.log('str.toUpperCase() = ', str.toUpperCase());
console.log('str.toLowerCase() = ', str.toLowerCase());
console.log('str.match(/o/gi) = ', str.match(/o/gi));
console.log('str.search(/L/) = ', str.search(/L/));
console.log('str.replace = ', str.replace(/[lo]/g, function (match, pos, originalText) {
    let result = '';
    switch (match) {
        case 'l':
            result = 'L';
            break;
        case 'o':
            result = 'O';
            break;
    }
    return result;
}));

let ids = '1,2,3';
console.log("'%s'.split(',',2) = %s", ids, ids.split(',', 2));
