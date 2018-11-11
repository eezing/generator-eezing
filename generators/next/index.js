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
    this.composeWith(require.resolve('../app'), {
      install: this.options.install,
      src: false
    });
  }

  writing() {
    this.packageExtend(getPackageFile());

    this.fs.copy(
      this.templatePath('jest.setup.js'),
      this.destinationPath('jest.setup.js')
    );
  }
};
