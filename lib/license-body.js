'use strict';

const get = require('lodash.get');

/**
 * @see https://spdx.org/licenses/
 */
module.exports = function licenseBody(spdxIdentifier) {
    if (spdxIdentifier.toUpperCase() === 'UNLICENSED') {
        return 'This is unlicensed proprietary software.';
    }

    const licenses = { mit: 'MIT License (Expat)' };
    const license = get(licenses, spdxIdentifier.toLowerCase(), `${spdxIdentifier} License`);

    return `The ${license}. See the license file for details.`;
};
