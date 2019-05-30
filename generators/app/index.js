'use strict';

const Generator = require('yeoman-generator');
const getPackageFile = require('./assets/package-file');
const packageExtend = require('../../extensions/package-extend');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.packageExtend = packageExtend.bind(this);
  }

  initializing() {
    this.composeWith(require.resolve('../core'), {
      install: this.options.install
    });
  }

  writing() {
    this.packageExtend(getPackageFile());

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    this.fs.copy(this.templatePath('.env'), this.destinationPath('.env'));

    this.fs.copy(this.templatePath('dev.js'), this.destinationPath('dev.js'));

    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));
  }

  installing() {
    this.npmInstall(['express', 'body-parser'], {
      'save-dev': true
    });
  }
};
