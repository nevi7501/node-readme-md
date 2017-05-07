'use strict';

module.exports = function (pkg = {}) {
    const LF = '\n';

    const get = require('lodash.get');

    function h1(text) {
        return `text${LF}${'='.repeat(text.length)}`;
    }

    function h2(text) {
        return `text${LF}${'-'.repeat(text.length)}`;
    }

    let markdown = [];

    markdown.push(h1(pkg.name));
    markdown.push(`${pkg.description}${LF}`);
    markdown.push(h2('TESTING'), `${get(pkg, 'scripts.test', 'TBD')}${LF}`)
    markdown.push(h2('LICENSE'), pkg.license);

    return markdown.join(LF);
};
