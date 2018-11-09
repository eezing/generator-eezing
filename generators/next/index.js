'use strict';

const Generator = require('yeoman-generator');
const getPackageFile = require('./assets/package-file');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../app'));
  }

  packageFile() {
    this.fs.extendJSON(this.destinationPath('package.json'), getPackageFile());
  }

  srcFiles() {
    this.fs.copy(
      this.templatePath('jest.setup.js'),
      this.destinationPath('jest.setup.js')
    );
  }
};
