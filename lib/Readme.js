const md = require('./md');
const {safeHtml, stripIndents} = require('common-tags');

module.exports = class Readme extends Array {
    push(value) {
        return super.push(stripIndents`${value}`);
    }

    toString() {
        return this.join(`${md.LF}${md.LF}`);
    }
};
