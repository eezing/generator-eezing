const knexDb = require('./sources/postgres');

module.exports = ({ ids, tenant_id }, db = knexDb) =>
  db
    .select([
      'id',
      'tenant_id',
      'first_name',
      'middle_name',
      'last_name',
      db.raw('to_json(created_at) as created_at'),
      'created_by',
      db.raw('to_json(updated_at) as updated_at'),
      'updated_by'
    ])
    .from('member')
    .where('tenant_id', tenant_id)
    .whereIn('id', ids)
    .then(res => ids.map(id => res.find(row => row && row.id === id)));
