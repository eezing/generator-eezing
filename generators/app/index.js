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

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copy(
      this.templatePath('__tests__'),
      this.destinationPath('__tests__')
    );

    this.fs.copy(this.templatePath('.env'), this.destinationPath('.env'));
  }
};
