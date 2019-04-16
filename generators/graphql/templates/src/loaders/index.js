const DataLoader = require('dataloader');
const memberById = require('./memberById');
const memberCreate = require('./memberCreate');

module.exports = (tenant, user) => ({
  memberById: new DataLoader(ids => memberById({ ids, tenant_id: tenant.id })),
  memberCreate: member =>
    memberCreate({ member, tenant_id: tenant.id, created_by: user.id })
});
