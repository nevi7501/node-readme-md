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

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('generates a titled README with a "Usage" section if passed `pkg.name` and an appropriate `additionalSections` argument', function () {
        const parameters = {
            pkg: {name: 'awesome-package'},
            additionalSections: [
                {
                    position: 'after:Install',
                    title: 'Usage',
                    body: stripIndents`
                        \`\`\`js
                        require('awesome-package')('Go go go!');
                        \`\`\`
                    `
                }
            ]
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
            \`\`\`js
            require('awesome-package')('Go go go!');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('adds an "See Also" section when passed an appropriate `additionalSections` argument using a numeric position', function () {
        const parameters = {
            additionalSections: [
                {
                    position: -1,
                    title: 'See Also',
                    body: '- [Example](http://www.example.com/)'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('adds an "See Also" section when passed an appropriate `additionalSections` argument using an "after" position directive', function () {
        const parameters = {
            additionalSections: [
                {
                    position: 'after:Testing',
                    title: 'See Also',
                    body: '- [Example](http://www.example.com/)'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('adds an "See Also" section when passed an appropriate `additionalSections` argument using a "before" position directive', function () {
        const parameters = {
            additionalSections: [
                {
                    position: 'before:License',
                    title: 'See Also',
                    body: '- [Example](http://www.example.com/)'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

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
