

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
      this.templatePath('.vscode/launch.json'),
      this.destinationPath('.vscode/launch.json')
    );

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
  }

  installing() {
    if (this.options['install'] === false) return;

    this.npmInstall(['express', 'body-parser', 'graphql'], {
      save: true
    });
  }
};
