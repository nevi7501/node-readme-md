'use strict';

/**
 * @param {Object} parameters
 * @param {Object} [parameters.pkg]
 * @param {String} [parameters.usage]
 */
module.exports = function (parameters = {}) {
    const escape = require('lodash.escape');
    const get = require('lodash.get');
    const {fencedShCodeBlock, h1, h2, LF} = require('./Markdown');
    const ReadmeSections = require('./ReadmeSections');

    const placeholder = '_To be documented._';
    const pkgDefaults = {name: escape('<package-name>'), description: placeholder};
    const pkg = Object.assign({}, pkgDefaults, parameters.pkg) || {};
    const usage = get(parameters, 'usage', placeholder);

    const isDefault = (property) => (pkg[property] === pkgDefaults[property]);

    /**
     * @see https://spdx.org/licenses/
     */
    function licenseBody(spdxIdentifier) {
        const licenses = {mit: 'MIT License (Expat)'};
        const license = get(licenses, spdxIdentifier.toLowerCase(), `${spdxIdentifier} License`);

        return `The ${license}. See the license file for details.`;
    }

    let readmeSections = new ReadmeSections();

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
            usage
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
        .forEach(section => readmeSections.push(section));

    return readmeSections.toString();
};
