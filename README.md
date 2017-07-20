readme-md
=========
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![Node.js][NODE VERSION BADGE]][NODE PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

A `README.md` generator.

Install
-------
```sh
$ npm install --save readme-md
```

Usage
-----
````js
const readme = require('readme-md');

const pkg = {name: 'my-awesome-package'};
const usage = `
    \`\`\`js
    require('my-awesome-package')({awesome: 'parameters'});
    \`\`\`
`.trim();

readme({pkg, usage});
// > my-awesome-package
// > ==================
// > _To be documented._
// >
// > Install
// > -------
// > ```sh
// > $ npm install --save my-awesome-package
// > ```
// >
// > Usage
// > -----
// > ```js
// > require('my-awesome-package')({awesome: 'parameters'});
// > ```
// >
// > Testing
// > -------
// > _To be documented._
// >
// > License
// > -------
// > _To be documented._
````

Testing
-------
```sh
$ npm test
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/travis/jbenner-radham/node-readme-md.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/jbenner-radham/node-readme-md
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/jbenner-radham/node-readme-md/blob/master/LICENSE
[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[NPM PAGE]: https://www.npmjs.com/package/readme-md
[NPM VERSION BADGE]: https://img.shields.io/npm/v/readme-md.svg?style=flat-square
