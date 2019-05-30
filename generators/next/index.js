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
    this.composeWith(require.resolve('../core'));
  }

  writing() {
    this.packageExtend(getPackageFile());

    this.fs.copy(
      this.templatePath('components'),
      this.destinationPath('components')
    );

    this.fs.copy(this.templatePath('pages'), this.destinationPath('pages'));

    this.fs.copy(
      this.templatePath('jest.setup.js'),
      this.destinationPath('jest.setup.js')
    );

    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));
  }

  installing() {
    if (this.options['install'] === false) return;

    this.npmInstall(['next@8', 'react@16', 'react-dom@16'], {
      save: true
    });

    this.npmInstall(
      [
        'enzyme',
        'enzyme-adapter-react-16',
        'react-test-renderer',
        '@babel/core',
        'eslint-plugin-react',
        'babel-eslint',
        'babel-jest'
      ],
      {
        'save-dev': true
      }
    );
  }
};
