const getUser = require('./getUser');

module.exports = user => ({
  getUser: id => getUser(id, user)
});
