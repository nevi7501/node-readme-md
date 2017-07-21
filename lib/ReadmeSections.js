const {LF} = require('./Markdown');

module.exports = class ReadmeSections extends Array {
    toString() {
        return this.join(`${LF}${LF}`);
    }
};
