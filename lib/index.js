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

    /**
     * @see https://spdx.org/licenses/
     */
    function licenseBody(spdxIdentifier) {
        let licenses = {mit: 'MIT License (Expat)'};
        let license = get(licenses, spdxIdentifier.toLowerCase(), `${spdxIdentifier} License`);

        return `The ${license}. See the license file for details.`;
    }

    let sections = [];

    // Header
    sections.push(stripIndents`
        ${h1(get(pkg, 'name', '&lt;package name&gt;'))}
        ${get(pkg, 'description', '_To be documented._')}
    `);

    // Install
    let install = get(pkg, 'name') ? fencedShCodeBlock(`npm install --save ${pkg.name}`)
                                   : '_To be documented._';

    sections.push(stripIndents`
        ${h2('Install')}
        ${install}
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
    let license = get(pkg, 'license') ? licenseBody(pkg.license)
                                      : '_To be documented._';

    sections.push(stripIndents`
        ${h2('License')}
        ${license}
    `);

    return sections.join(`${LF}${LF}`);
};
