'use strict';

const any = jasmine.any;
const readme = require('../');
const {stripIndents} = require('common-tags');

describe('readme-md', function () {
    beforeEach(function () {
        this.parameters = {
            pkg: {
                name: 'readme-md'
            }
        };
    });

    it('is a function', function () {
        expect(readme).toEqual(any(Function));
    });

    it('generates a README with placeholders if not passed any arguments', function () {
        const fixture = stripIndents`
            &lt;package-name&gt;
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

        expect(readme()).toEqual(fixture);
    });

    it('generates a titled README with placeholders if passed an object with only a `pkg.name` property', function () {
        const parameters = {pkg: {name: 'awesome-package'}};

        const fixture = stripIndents`
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

        expect(readme(parameters)).toEqual(fixture);
    });

    it('generates a titled README with a usage section if passed `pkg.name` and `usage` parameters', function () {
        const parameters = {
            pkg: {name: 'awesome-package'},
            usage: `require('awesome-package')('Go go go!');`
        };

        const fixture = stripIndents`
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
            require('awesome-package')('Go go go!');

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('returns a string', function () {
        expect(readme(this.parameters)).toEqual(any(String));
    });
});
