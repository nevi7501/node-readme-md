'use strict';

module.exports = function (pkg = {}) {
    const LF = '\n';

    const get = require('lodash.get');
    const stripIndents = require('common-tags').stripIndents;

    /**
     * @see http://spec.commonmark.org/0.27/#code-fence
     * @see http://spec.commonmark.org/0.27/#info-strings
     */
    function codeFence(infoString = '') {
        return `${'`'.repeat(3)}${infoString}`;
    }

    /**
     * @see http://spec.commonmark.org/0.27/#fenced-code-blocks
     * @see http://spec.commonmark.org/0.27/#info-string
     */
    function fencedCodeBlock(code, infoString = '') {
        return [
            codeFence(infoString),
            code,
            codeFence()
        ].join(LF);
    }

    /**
     * @see fencedCodeBlock
     */
    function fencedShCodeBlock(code) {
        return fencedCodeBlock(`$ ${code}`, 'sh');
    }

    /**
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
    function h1(text) {
        return `${text}${LF}${'='.repeat(text.length)}`;
    }

    /**
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
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
    let testing = get(pkg, 'scripts.test') ? fencedShCodeBlock('npm test')
                                           : '_To be documented._';

    sections.push(stripIndents`
        ${h2('Testing')}
        ${testing}
    `);

    // License
    sections.push(stripIndents`
        ${h2('License')}
        ${get(pkg, 'license', '_To be documented._')}
    `);

    return sections.join(`${LF}${LF}`);
};
