'use strict';

/**
 * @param {Object} parameters
 * @param {Object} [parameters.pkg]
 */
module.exports = function (parameters = {}) {
    const escape = require('lodash.escape');
    const get = require('lodash.get');
    const {fencedShCodeBlock, h1, h2, LF} = require('./Markdown');
    const Readme = require('./Readme');

    const placeholder = '_To be documented._';
    const defaults = {
        name: escape('<package-name>'),
        description: placeholder,
        usage: placeholder
    };

    const pkg = Object.assign({}, defaults, parameters.pkg) || {};

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

    const install = (!isDefault('name'))
        ? fencedShCodeBlock(`npm install --save ${pkg.name}`)
        : placeholder;

    const testing = get(pkg, 'scripts.test')
        ? fencedShCodeBlock('npm test')
        : placeholder;

    const license = get(pkg, 'license')
        ? licenseBody(pkg.license)
        : placeholder;

    const sections = [
        [
            h1(pkg.name),
            pkg.description
        ],
        [
            h2('Install'),
            install
        ],
        [
            h2('Usage'),
            pkg.usage
        ],
        [
            h2('Testing'),
            testing
        ],
        [
            h2('License'),
            license
        ]
    ];

    sections.map(section => section.join(LF))
        .forEach(section => readme.push(section));

    return readme.toString();
};
