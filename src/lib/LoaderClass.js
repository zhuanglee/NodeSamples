
let Classes = Object.create(null);

/**
 * Load the given class.
 * @param {string} className Name of class to default
 * @return {function|object} Class constructor or exports
 * @private
 */
function loadClass(className) {
    let Class = Classes[className];

    if (Class !== undefined) {
        return Class;
    }

    // This uses a switch for static require analysis
    switch (className) {
        case 'mysql_util':
            Class = require('../src/mysql_util/index.js');
            break;
        default:
            throw new Error('Cannot find class \'' + className + '\'');
    }

    // Store to prevent invoking require()
    Classes[className] = Class;

    return Class;
}

exports.loadClass = loadClass;