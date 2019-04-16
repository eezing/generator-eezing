const uuid = require('uuid/v4');
const knexDb = require('./sources/postgres');

module.exports = async ({ member, tenant_id, created_by }, db = knexDb) => {
  const [result] = await db
    .insert({
      ...member,
      id: uuid(),
      tenant_id: tenant_id,
      created_at: new Date().toJSON(),
      created_by: created_by
    })
    .into('member')
    .returning([
      'id',
      'tenant_id',
      'first_name',
      'middle_name',
      'last_name',
      db.raw('to_json(created_at) as created_at'),
      'created_by'
    ]);

  return result;
};
