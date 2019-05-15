const createLoaders = require('./loaders');

class Context {
  constructor(user = {}) {
    this.user = user;
    this.loaders = createLoaders(user);
  }

  get user_id() {
    return this.user.id;
  }

  get tenant_id() {
    return this.user.tenant_id;
  }
}

module.exports = Context;
