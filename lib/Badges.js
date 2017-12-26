const {LF} = require('md-writer');

/**
 * @typedef {Object} Badge
 * @property {String} name
 * @property {String} image
 * @property {String} link
 */

module.exports = class Badges extends Array {
    toString() {
        return this.map(badge => {
            return `[![${badge.name}](${badge.image})](${badge.link})`;
        }).join(LF) || '';
    }
};
