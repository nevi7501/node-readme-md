'use strict';

const expect = require('chai').expect;
const readme = require('../');

describe('readme-md', function () {
    beforeEach(function () {
        this.pkg = {
            name: 'readme-md'
        };
    });

    it('is a function', function () {
        expect(readme).to.be.a('function');
    });

    it('returns a string', function () {
        expect(readme(this.pkg)).to.be.a('string');
    });
});
