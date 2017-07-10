'use strict';

module.exports = function (parameters = {}) {
    const md = require('./md');
    const get = require('lodash.get');
    const Readme = require('./Readme');

    const escape = (str) => {
        const entityMap = {'<': '&lt;', '>': '&gt;', '`': '&#x60;'};
        const chars = Array.from(str);

        return chars.map(char => (char in entityMap) ? entityMap[char] : char)
            .join('');
    };

    const placeholder = '_To be documented._';
    const defaults = {
        name: escape('<package-name>'),
        description: placeholder,
        usage: placeholder
    };

    const pkg = Object.assign({}, defaults, parameters);

    const isDefault = (property) => (pkg[property] === defaults[property]);

    /**
     * @see https://spdx.org/licenses/
     */
    function licenseBody(spdxIdentifier) {
        const licenses = {mit: 'MIT License (Expat)'};
        const license = get(licenses, spdxIdentifier.toLowerCase(), `${spdxIdentifier} License`);

        return `The ${license}. See the license file for details.`;
    }

    let readme = new Readme();

    // Header
    readme.push(`
        ${md.h1(pkg.name)}
        ${pkg.description}
    `);

    // Install
    const install = (!isDefault('name')) ? md.fencedShCodeBlock(`npm install --save ${pkg.name}`)
                                         : placeholder;

    readme.push(`
        ${md.h2('Install')}
        ${install}
    `);

    // Usage
    readme.push(`
        ${md.h2('Usage')}
        ${pkg.usage}
    `);

    // Testing
    const testing = get(pkg, 'scripts.test') ? md.fencedShCodeBlock('npm test')
                                             : placeholder;

    readme.push(`
        ${md.h2('Testing')}
        ${testing}
    `);

    // License
    const license = get(pkg, 'license') ? licenseBody(pkg.license)
                                        : placeholder;

    readme.push(`
        ${md.h2('License')}
        ${license}
    `);

    return readme.toString();
};
