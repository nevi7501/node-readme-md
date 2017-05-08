'use strict';

const expect = require('chai').expect;
const readme = require('../');
const stripIndents = require('common-tags').stripIndents;

describe('readme-md', function () {
    beforeEach(function () {
        this.pkg = {
            name: 'readme-md'
        };
    });

    it('is a function', function () {
        expect(readme).to.be.a('function');
    });

    it('generates a README with placeholders if not passed any arguments', function () {
        let fixture = stripIndents`
            &lt;package name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme()).to.equal(fixture);
    });

    it('generates a titled README with placeholders if passed an object with only a "name" property', function () {
        let pkg = {name: 'awesome-package'};

        let fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            $ npm install --save awesome-package
            \`\`\`

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(pkg)).to.equal(fixture);
    });

    it('returns a string', function () {
        expect(readme(this.pkg)).to.be.a('string');
    });
});
