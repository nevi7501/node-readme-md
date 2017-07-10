const {stripIndents} = require('common-tags');
const {LF} = require('./Markdown');

module.exports = class Readme extends Array {
    push(value) {
        return super.push(stripIndents`${value}`);
    }

    toString() {
        return this.join(`${LF}${LF}`);
    }
};
