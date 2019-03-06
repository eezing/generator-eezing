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

    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    this.fs.copy(
      this.templatePath('debug.js'),
      this.destinationPath('debug.js')
    );
  }
};
