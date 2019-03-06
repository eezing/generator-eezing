

const Generator = require('yeoman-generator');
const packageExtend = require('../../extensions/package-extend');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.packageExtend = packageExtend.bind(this);
  }

  writing() {
    this.packageExtend({});
  }
};
