'use strict';

const Generator = require('yeoman-generator');
const userActions = require('yeoman-generator/lib/actions/user');
const getPackageFile = require('./assets/package-file');

module.exports = class extends Generator {
  packageFile() {
    const packageFile = getPackageFile({
      name: this.determineAppname(),
      description: `${this.determineAppname()} project`,
      author: userActions.git.name()
    });

    this.fs.extendJSON(this.destinationPath('package.json'), packageFile);
  }

  vscodeFiles() {
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
  }

  configFiles() {
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
  }

  srcFiles() {
    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );
    this.fs.copy(
      this.templatePath('src/__tests__/index-test.js'),
      this.destinationPath('src/__tests__/index-test.js')
    );
  }

  readme() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title: this.determineAppname() }
    );
  }

  devDependencies() {
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
