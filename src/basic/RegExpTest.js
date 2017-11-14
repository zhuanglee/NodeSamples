/**
 * 打印匹配到的值
 * @param array 待匹配的数据源
 * @param pattern 正则表达式
 */
function printMatchStr(array, pattern) {
    console.log('\n正则表达式%s匹配到：', pattern);
    let count = 0;
    array.forEach(function (str) {
        let match = str.match(pattern);
        if (match) {
            console.log(match);
            count++;
        }
    });
    console.log('共%d个\n', count);
}

function matchUrl(url) {
    return url.match(/(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/);
}


function testBasic() {
    let array = ['gd', 'g d', 'g_d', 'g0d', 'god',
        'good', 'Good', 'gooD', 'goood', 'gooooood',
        'ggood', 'goodd', 'ggoodd'];
    console.log(array);
    printMatchStr(array, new RegExp('go*d'));
    printMatchStr(array, new RegExp('go{0,}d/'));
    printMatchStr(array, new RegExp(/go+d/));
    printMatchStr(array, new RegExp(/go{1,}d/));
    printMatchStr(array, /go?d/);
    printMatchStr(array, /go{0,1}d/);
    printMatchStr(array, /g.d/);
    printMatchStr(array, /g(0|o)d/);
    printMatchStr(array, /g[0-9,a-z]d/);
    printMatchStr(array, /g[^o]/);// 匹配中间非o的字符串
    printMatchStr(array, /g\d/);// 匹配中间为数字的字符串，等价于 [0-9]
    printMatchStr(array, /g\D/);// 匹配中间非数字的字符串，等价于 [^0-9]
    printMatchStr(array, /g\s/);// 匹配任何空白字符，等价于 [ \f\n\r\t\v]
    printMatchStr(array, /g\S/);// 匹配任何非空白字符，等价于 [^ \f\n\r\t\v]
    printMatchStr(array, /g\w/);// \w匹配包括下划线的任何单词字符，等价于'[A-Za-z0-9_]'
    printMatchStr(array, /g\W/);// \W匹配任何非单词字符，等价于 '[^A-Za-z0-9_]'
    printMatchStr(array, /^go{2,3}/);
    printMatchStr(array, /^go{2,3}/g);
    printMatchStr(array, /^go{2,3}/i);
    printMatchStr(array, /go{2,6}d$/);
}

function testMatchUrl() {
    console.log(matchUrl(
        "http://localhost:8080/"));
    console.log(matchUrl(
        "http://localhost:8080/index.html"));
    console.log(matchUrl(
        "https://gaidu.com"));
    console.log(matchUrl(
        "://www.gaidu.com:666/"));
}


function printRegExpInfo() {
    let reg = /^g[o|O]*d$/gim;
    console.log('reg.source =', reg.source);
    console.log('reg.global =', reg.global);
    console.log('reg.ignoreCase =', reg.ignoreCase);
    console.log('reg.multiline =', reg.multiline);
    console.log('reg.lastIndex =', reg.lastIndex);
    console.log('reg.exec(\'GoOd\') =', reg.exec('GoOd'));
    console.log('reg.lastIndex =', reg.lastIndex);
}


let execTest = function (reg, str) {
    console.log('\nreg.source =', reg.source);
    let execResult = reg.exec(str);
    console.log("reg.exec('%s') = execResult = ", str, execResult);
    if(!execResult){
        return;
    }
    console.log('execResult.index =', execResult.index);
    console.log('execResult.input =', execResult.input);
    console.log('execResult.length = ', execResult.length);
    execResult.forEach(function (item) {
        console.log('execResult item =', item);
    })
};

let regExpTest = function (reg, str) {
    console.log("%s.test('%s') = %s", reg, str, reg.test(str));
};

testBasic();
testMatchUrl();
printRegExpInfo();
let str = 'GodGoodG0D';// 最后一个g0d中间是零
execTest(/^g[o|O]*d/gi, str);
execTest(/g[o|O]*d$/gi, str);
execTest(/g[o|O]*d/gi, str);
regExpTest(new RegExp(/g[o|O]*D/g), str);
regExpTest(new RegExp(/g[o|O]*D/, 'gi'), str);
