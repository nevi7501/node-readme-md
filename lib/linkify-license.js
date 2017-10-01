'use strict';

/**
 * @param {String} licenseBody
 * @param {String} linkTarget
 * @returns {String}
 * @see http://spec.commonmark.org/0.28/#inline-link
 */
module.exports = function linkifyLicense(licenseBody, linkTarget) {
    return licenseBody.replace(/license file/, `[license file](${linkTarget})`);
};
