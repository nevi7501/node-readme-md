'use strict';

/**
 * @typedef {Object} Section
 * @property {Number} [position]
 * @property {String} header
 * @property {String} [body]
 */

/**
 * @param {Object} parameters
 * @param {Section[]} [parameters.additionalSections]
 * @param {Object} [parameters.pkg]
 * @param {String} [parameters.usage]
 */
module.exports = function (parameters = {}) {
    const escape = require('lodash.escape');
    const get = require('lodash.get');
    const {fencedShCodeBlock, h1, h2, LF} = require('./Markdown');
    const ReadmeSections = require('./ReadmeSections');

    const additionalSections = get(parameters, 'additionalSections', []);
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

    let sections = [
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

    additionalSections.forEach(section => {
        const position = section.position || sections.length;
        const deleteCount = 0;
        const body = section.body || placeholder;
        const sectionPair = [h2(section.header), body];

        sections.splice(position, deleteCount, sectionPair);
    });

    sections.map(section => section.join(LF))
        .forEach(section => readmeSections.push(section));

    return readmeSections.toString();
};

module.exports.Markdown = require('./Markdown');
