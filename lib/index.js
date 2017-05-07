'use strict';

module.exports = function (pkg = {}) {
    const LF = '\n';

    const get = require('lodash.get');
    const stripIndents = require('common-tags').stripIndents;

    function h1(text) {
        return `${text}${LF}${'='.repeat(text.length)}`;
    }

    function h2(text) {
        return `${text}${LF}${'-'.repeat(text.length)}`;
    }

    let sections = [];

    // Header
    sections.push(stripIndents`
        ${h1(pkg.name)}
        ${get(pkg, 'description', 'TBD')}
    `);

    // Usage
    sections.push(stripIndents`
        ${h2('Usage')}
        TBD
    `);

    // Testing
    sections.push(stripIndents`
        ${h2('Testing')}
        ${get(pkg, 'scripts.test', 'TBD')}
    `);

    // License
    sections.push(stripIndents`
        ${h2('License')}
        ${get(pkg, 'license', 'TBD')}
    `);

    return sections.join(`${LF}${LF}`);
};
