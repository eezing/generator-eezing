'use strict';

const Generator = require('yeoman-generator');
const userActions = require('yeoman-generator/lib/actions/user');
const getPackageFile = require('./assets/package-file');
const packageExtend = require('../../extensions/package-extend');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.packageExtend = packageExtend.bind(this);
    this.option('install', { type: Boolean, default: true });
    this.option('src', { type: Boolean, default: true });
  }

  writing() {
    const newPkg = getPackageFile({
      name: this.determineAppname(),
      description: `${this.determineAppname()} project`,
      author: userActions.git.name()
    });

    this.packageExtend(newPkg);

    this.fs.copy(
      this.templatePath('.vscode/extensions.json'),
      this.destinationPath('.vscode/extensions.json')
    );

    this.fs.copy(
      this.templatePath('.vscode/launch.json'),
      this.destinationPath('.vscode/launch.json')
    );

    this.fs.copy(
      this.templatePath('.vscode/settings.json'),
      this.destinationPath('.vscode/settings.json')
    );

    this.fs.copy(this.templatePath('.env'), this.destinationPath('.env'));

    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.prettierignore'),
      this.destinationPath('.prettierignore')
    );

    if (this.options.src === true) {
      this.fs.copy(
        this.templatePath('src/index.js'),
        this.destinationPath('src/index.js')
      );

      this.fs.copy(
        this.templatePath('src/__tests__/index-test.js'),
        this.destinationPath('src/__tests__/index-test.js')
      );
    }

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title: this.determineAppname() }
    );
  }

  installing() {
    if (this.options['install'] === false) return;

    this.npmInstall(
      [
        'jest',
        'prettier',
        'eslint',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
        'babel-eslint',
        'babel-jest',
        'dotenv',
        'husky'
      ],
      { 'save-dev': true }
    );
  }
};
