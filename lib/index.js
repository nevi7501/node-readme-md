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
 * @property {String} header
 * @property {String} [body] - If not specified it will default to the placeholder text.
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

    const getSectionIndex = (title) => {
        return sections.reduce((accumulator, sectionPair, index) => {
            const [header,] = sectionPair;

            return (header == h2(title)) ? index : accumulator;
        }, NaN);
    };

    const getPositionIndex = (position) => {
        let title = '';
        let after = /after:(.+)/.exec(position);

        if (after) {
            title = after.pop();

            return (getSectionIndex(title) + 1);
        }

        let before = /before:(.+)/.exec(position);

        if (before) {
            title = before.pop();

            return getSectionIndex(title);
        }

        const radix = 10;

        return parseInt(position, radix);
    };

    additionalSections.forEach(section => {
        const positionIndex = getPositionIndex(section.position);
        const position = isNaN(positionIndex) ? sections.length : positionIndex;
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
