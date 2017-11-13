let reg = /^g[o|O]*d$/gim;
console.log('reg.source =', reg.source);
console.log('reg.global =', reg.global);
console.log('reg.ignoreCase =', reg.ignoreCase);
console.log('reg.multiline =', reg.multiline);
console.log('reg.lastIndex =', reg.lastIndex);
console.log('reg.exec(\'GoOd\') =', reg.exec('GoOd'));
console.log('reg.lastIndex =', reg.lastIndex);

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
let test = function (reg, str) {
    console.log("%s.test('%s') = %s", reg, str, reg.test(str));
};
let str = 'GodGoodG0D';// 最后一个g0d中间是零
execTest(/^g[o|O]*d/gi, str);
execTest(/g[o|O]*d$/gi, str);
execTest(/g[o|O]*d/gi, str);
test(new RegExp(/g[o|O]*D/g), str);
test(new RegExp(/g[o|O]*D/, 'gi'), str);
