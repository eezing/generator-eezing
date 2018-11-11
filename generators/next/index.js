'use strict';

const Generator = require('yeoman-generator');
const getPackageFile = require('./assets/package-file');
const packageExtend = require('../../extensions/package-extend');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.packageExtend = packageExtend.bind(this);
    this.option('install', { type: Boolean, default: true });
  }

  initializing() {
    this.composeWith(require.resolve('../core'), {
      install: this.options.install
    });
  }

  writing() {
    this.packageExtend(getPackageFile());

    this.prependOnceListener;

    this.fs.copy(
      this.templatePath('components'),
      this.destinationPath('components')
    );

    this.fs.copy(this.templatePath('pages'), this.destinationPath('pages'));

    this.fs.copy(
      this.templatePath('jest.setup.js'),
      this.destinationPath('jest.setup.js')
    );
  }
};
