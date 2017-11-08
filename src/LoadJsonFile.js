let fs = require('fs');
let stripJsonComments = require('strip-json-comments');

function loadJSONFile (file) {
    let json = fs.readFileSync(file).toString();
    return JSON.parse(stripJsonComments(json));
}

let packageInfo = loadJSONFile('./package.json');
console.log(packageInfo);