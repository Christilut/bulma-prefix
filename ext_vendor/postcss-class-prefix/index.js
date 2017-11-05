'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-class-prefix', classPrefix);

function classPrefix(prefix, options) {
    options = options || {};

    return function (root) {

        root.walkRules(function (rule) {
            if (!rule.selectors) {
                return rule;
            }

            rule.selectors = rule.selectors.map(function (selector) {
                var regexp = /(\[class\^=["']{0,1})([\w-]*)(['"]{0,1})/g;
                selector = selector.replace(regexp, function (x, g1, g2, g3) {
                    if (classMatchesTest(g2, options.ignore)) {
                        return x;
                    }
                    return g1 + prefix + g2 + g3;
                });

                var regexp = /\.([\w-]*)/g;
                selector = selector.replace(regexp, function(x, g1) {
                    if (classMatchesTest(g1, options.ignore)) {
                        return x;
                    }
                    return '.' + prefix + g1;
                });

                return selector;
            });
        });
    };
}

/**
 * Determine if class passes test
 *
 * @param {string} clss
 * @param {string} test
 */
function classMatchesTest(clss, test) {
    if (!test) {
        return false;
    }

    clss = clss.trim();

    if (test instanceof RegExp) {
        return test.exec(clss);
    }

    if (Array.isArray(test)) {
        // Reassign arguments
        var tests = test;
        test = undefined;

        return tests.some(function (test) {
            if (test instanceof RegExp) {
                return test.exec(clss);
            } else {
                return clss === test;
            }
        });
    }

    return clss === test;
}

/**
 * Determine if selector is a class
 *
 * @param {string} selector
 */
function isClassSelector(selector) {
    return selector.indexOf('.') !== -1;
}
