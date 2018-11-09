const Generator = require('yeoman-generator');
const userActions = require('yeoman-generator/lib/actions/user');

module.exports = class extends Generator {
  packageFile() {
    const pkgJson = {
      name: this.determineAppname(),
      version: '1.0.0',
      description: `${this.determineAppname()} project`,
      keywords: [],
      author: userActions.git.name(),
      license: 'ISC',
      main: 'src/index.js',
      scripts: {
        start: 'node -r dotenv/config src/index.js',
        pretty: "prettier --write '**/*.js'",
        test: 'npm run test:jest && npm run test:lint',
        'test:watch': 'jest --watch',
        'test:jest': 'jest --coverage',
        'test:lint': 'eslint src --ext .js --ext .mjs'
      },
      dependencies: {},
      devDependencies: {},
      jest: {
        testURL: 'http://localhost/'
      },
      eslintConfig: {
        env: {
          commonjs: true,
          es6: true,
          node: true,
          jest: true
        },
        parser: 'babel-eslint',
        plugins: ['prettier'],
        extends: ['eslint:recommended', 'prettier'],
        rules: {
          'no-console': 2
        }
      },
      prettier: {
        semi: true,
        bracketSpacing: true,
        singleQuote: true
      },
      husky: {
        hooks: {
          'pre-commit': 'npm run test:lint'
        }
      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  // devDependencies() {
  //   this.npmInstall(
  //     [
  //       "jest",
  //       "prettier",
  //       "eslint",
  //       "eslint-plugin-prettier",
  //       "eslint-config-prettier",
  //       "babel-eslint",
  //       "babel-jest",
  //       "dotenv",
  //       "husky"
  //     ],
  //     { "save-dev": true }
  //   );
  // }

  vscode() {
    this.fs.copy(
      this.templatePath('vscode/extensions.json'),
      this.destinationPath('.vscode/extensions.json')
    );

    this.fs.copy(
      this.templatePath('vscode/launch.json'),
      this.destinationPath('.vscode/launch.json')
    );

    this.fs.copy(
      this.templatePath('vscode/settings.json'),
      this.destinationPath('.vscode/settings.json')
    );
  }
};
