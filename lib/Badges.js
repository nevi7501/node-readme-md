const { LF } = require('md-writer');

/**
 * @typedef {Object} Badge
 * @property {String} alt
 * @property {String} image
 * @property {String} link
 * @property {String} style
 */

module.exports = class Badges extends Array {
    toString() {
        return this.map(badge => {
            const style = badge.style ? `style=${badge.style}` : '';

            return `[![${badge.alt}](${badge.image}?${style})](${badge.link})`;
        }).join(LF) || '';
    }
};
