'use strict';

/**
 * A `PositionDirective` is a string which begins with either "before:" or
 * "after:" and the section title to search for.
 *
 * @example
 * {position: 'after:Install'}
 * @example
 * {position: 'before:License'}
 * @typedef {String} PositionDirective
 */

/**
 * @typedef {Object} Section
 * @property {(Number|PositionDirective)} [position] - If not specified it will default to the length of the array.
 * @property {String} title
 * @property {String} [body] - If not specified it will default to the placeholder text.
 */

/**
 * @param {Object} parameters
 * @param {Section[]} [parameters.additionalSections]
 * @param {Object} [parameters.pkg]
 */
module.exports = function (parameters = {}) {
    const escape = require('lodash.escape');
    const get = require('lodash.get');
    const {fencedShCodeBlock, h1, h2} = require('./Markdown');
    const ReadmeSections = require('./ReadmeSections');

    const additionalSections = get(parameters, 'additionalSections', []);
    const placeholder = '_To be documented._';
    const pkgDefaults = {name: escape('<package-name>'), description: placeholder};
    const pkg = Object.assign({}, pkgDefaults, parameters.pkg) || {};

    const isDefault = (property) => (pkg[property] === pkgDefaults[property]);

    /**
     * @see https://spdx.org/licenses/
     */
    function licenseBody(spdxIdentifier) {
        if (spdxIdentifier.toUpperCase() === 'UNLICENSED') {
            return 'This is unlicensed proprietary software.';
        }

        const licenses = {mit: 'MIT License (Expat)'};
        const license = get(licenses, spdxIdentifier.toLowerCase(), `${spdxIdentifier} License`);

        return `The ${license}. See the license file for details.`;
    }

    const install = !isDefault('name')
        ? fencedShCodeBlock(`npm install --save ${pkg.name}`)
        : placeholder;

    const testing = get(pkg, 'scripts.test')
        ? fencedShCodeBlock('npm test')
        : placeholder;

    const license = get(pkg, 'license')
        ? licenseBody(pkg.license)
        : placeholder;

    let readmeSections = new ReadmeSections(
        [
            h1(pkg.name),
            pkg.description
        ],
        [
            h2('Install'),
            install
        ],
        [
            h2('Testing'),
            testing
        ],
        [
            h2('License'),
            license
        ]
    );

    additionalSections.forEach(section => {
        const positionIndex = readmeSections.getPositionIndex(section.position);
        const position = isNaN(positionIndex) ? readmeSections.length : positionIndex;
        const deleteCount = 0;
        const body = section.body || placeholder;
        const sectionPair = [h2(section.title), body];

        readmeSections.splice(position, deleteCount, sectionPair);
    });

    return readmeSections.toString();
};

module.exports.Markdown = require('./Markdown');
