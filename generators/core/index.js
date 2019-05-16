const Generator = require('yeoman-generator');
const userActions = require('yeoman-generator/lib/actions/user');
const kebabCase = require('lodash.kebabcase');
const getPackageFile = require('./assets/package-file');
const packageExtend = require('../../extensions/package-extend');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.packageExtend = packageExtend.bind(this);
  }

  initializing() {
    const newPkg = getPackageFile({
      name: kebabCase(this.determineAppname()),
      description: `${this.determineAppname()} project`,
      author: userActions.git.name()
    });

    this.packageExtend(newPkg);
  }

  writing() {
    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.prettierignore'),
      this.destinationPath('.prettierignore')
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title: kebabCase(this.determineAppname()) }
    );
  }

  installing() {
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
