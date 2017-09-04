module.exports = class Markdown {
    /**
     * @type {String}
     * @default
     * @readonly
     */
    static get LF() {
        return '\n';
    }

    /**
     * @returns {String}
     * @see http://spec.commonmark.org/0.27/#code-fence
     * @see http://spec.commonmark.org/0.27/#info-strings
     */
    static codeFence(infoString = '') {
        return `${'`'.repeat(3)}${infoString}`;
    }

    /**
     * @returns {String}
     * @see http://spec.commonmark.org/0.27/#fenced-code-blocks
     * @see http://spec.commonmark.org/0.27/#info-string
     */
    static fencedCodeBlock(code, infoString = '') {
        return [
            Markdown.codeFence(infoString),
            code,
            Markdown.codeFence()
        ].join(Markdown.LF);
    }

    /**
     * @returns {String}
     * @see fencedCodeBlock
     */
    static fencedShCodeBlock(code) {
        return Markdown.fencedCodeBlock(`$ ${code}`, 'sh');
    }

    /**
     * @returns {String}
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
    static h1(text) {
        return `${text}${Markdown.LF}${'='.repeat(text.length)}`;
    }

    /**
     * @returns {String}
     * @see http://spec.commonmark.org/0.27/#setext-headings
     */
    static h2(text) {
        return `${text}${Markdown.LF}${'-'.repeat(text.length)}`;
    }
};
