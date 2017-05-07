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
        ${h1(get(pkg, 'name', '&lt;package name&gt;'))}
        ${get(pkg, 'description', '_To be documented._')}
    `);

    // Usage
    sections.push(stripIndents`
        ${h2('Usage')}
        _To be documented._
    `);

    // Testing
    sections.push(stripIndents`
        ${h2('Testing')}
        ${get(pkg, 'scripts.test', '_To be documented._')}
    `);

    // License
    sections.push(stripIndents`
        ${h2('License')}
        ${get(pkg, 'license', '_To be documented._')}
    `);

    return sections.join(`${LF}${LF}`);
};
