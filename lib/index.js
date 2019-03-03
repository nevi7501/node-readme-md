'use strict';

/**
 * @typedef {Object} License
 * @property {String} linkTarget
 */

/**
 * A `PositionDirective` is a string which begins with either "before:" or
 * "after:" and the section title to search for.
 *
 * @example
 * { position: 'after:Install' }
 * @example
 * { position: 'before:License' }
 * @typedef {String} PositionDirective
 */

/**
 * @typedef {Object} Section
 * @property {(Number|PositionDirective)} [position] - If not specified it will default to the length of the array.
 * @property {String} title
 * @property {String} [body] - If not specified it will default to the placeholder text.
 */

const Badges = require('./Badges');
const escape = require('lodash.escape');
const get = require('lodash.get');
const { fencedShCodeBlock, h1, h2, LF } = require('md-writer');
const licenseBody = require('./license-body');
const linkifyLicense = require('./linkify-license.js');
const ReadmeSections = require('./ReadmeSections');

/**
 * @param {Object} parameters
 * @param {Section[]} [parameters.additionalSections]
 * @param {License} [parameters.license]
 * @param {Object} [parameters.pkg]
 */
module.exports = function (parameters = {}) {
    const additionalSections = get(parameters, 'additionalSections', []);
    const badges = new Badges(...parameters.badges || []).toString();
    const placeholder = '_To be documented._';
    const pkgDefaults = { description: placeholder, name: escape('<package-name>') };
    const pkg = Object.assign({}, pkgDefaults, parameters.pkg);
    const preferYarn = get(parameters.config, 'prefer-yarn', false);
    const preferGlobal = get(pkg, 'preferGlobal', false);
    const npmTestCmd = 'npm test';
    const yarnTestCmd = `yarn test # Or alternatively: \`${npmTestCmd}\``;
    const pkgTestCmd = preferYarn ? yarnTestCmd : npmTestCmd;
    const npmInstallCmd = `npm install ${pkg.name}`;
    const npmGlobalInstallCmd = `npm install --global ${pkg.name}`;
    const yarnInstallCmd = `yarn add ${pkg.name} # Or alternatively: \`${npmInstallCmd}\``;
    const yarnGlobalInstallCmd = `yarn global add ${pkg.name} # Or alternatively: \`${npmGlobalInstallCmd}\``;
    const pkgInstallCmd = preferYarn
        ? (preferGlobal ? yarnGlobalInstallCmd : yarnInstallCmd)
        : (preferGlobal ? npmGlobalInstallCmd : npmInstallCmd);

    const isDefault = (property) => (pkg[property] === pkgDefaults[property]);

    const badgeBlock = badges
        ? `${badges}${LF}${LF}`
        : '';

    const install = !isDefault('name')
        ? fencedShCodeBlock(pkgInstallCmd)
        : placeholder;

    const testing = get(pkg, 'scripts.test')
        ? fencedShCodeBlock(pkgTestCmd)
        : placeholder;

    const license = get(pkg, 'license')
        ? licenseBody(pkg.license)
        : placeholder;

    const linkifiedLicense = get(parameters, 'license.linkTarget')
        ? linkifyLicense(license, parameters.license.linkTarget)
        : '';

    const readmeSections = new ReadmeSections(
        [
            h1(pkg.name),
            `${badgeBlock}${pkg.description}`
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
            linkifiedLicense || license
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
