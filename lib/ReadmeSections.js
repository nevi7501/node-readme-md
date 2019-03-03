const { LF, h2 } = require('md-writer');

module.exports = class ReadmeSections extends Array {
    getPositionIndex(position) {
        const after = /after:(.+)/.exec(position);

        if (after) {
            const [, title] = after;

            return (this.getSectionIndex(title) + 1);
        }

        const before = /before:(.+)/.exec(position);

        if (before) {
            const [, title] = before;

            return this.getSectionIndex(title);
        }

        const radix = 10;

        return parseInt(position, radix);
    }

    getSectionIndex(title = '') {
        return this.reduce((accumulator, sectionPair, index) => {
            const [header] = sectionPair;

            return (header == h2(title)) ? index : accumulator; // eslint-disable-line eqeqeq
        }, NaN);
    }

    toString() {
        return this.map(headerBodyPair => headerBodyPair.join(LF))
            .join(`${LF}${LF}`);
    }
};
