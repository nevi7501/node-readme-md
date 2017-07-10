'use strict';

module.exports = {
    get LF() {
        return '\n';
    },

    /**
     * @see http://spec.commonmark.org/0.27/#code-fence
     * @see http://spec.commonmark.org/0.27/#info-strings
     */
    codeFence(infoString = '') {
        return `${'`'.repeat(3)}${infoString}`;
    },

    /**
     * @see http://spec.commonmark.org/0.27/#fenced-code-blocks
     * @see http://spec.commonmark.org/0.27/#info-string
     */
    fencedCodeBlock(code, infoString = '') {
        return [
            this.codeFence(infoString),
            code,
            this.codeFence()
        ].join(this.LF);
    },

    /**
     * @see fencedCodeBlock
     */
    fencedShCodeBlock(code) {
        return this.fencedCodeBlock(`$ ${code}`, 'sh');
    },

    /**
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
    h1(text) {
        return `${text}${this.LF}${'='.repeat(text.length)}`;
    },

    /**
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
    h2(text) {
        return `${text}${this.LF}${'-'.repeat(text.length)}`;
    }
};
