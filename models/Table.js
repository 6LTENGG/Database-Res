const db = require('../config/db');

const Table = {
  getAll: (cb) => db.query('SELECT * FROM tables ORDER BY table_number', cb),
  create: (data, cb) => db.query(
    'INSERT INTO tables (table_number, capacity, status) VALUES (?, ?, ?)',
    [data.table_number, data.capacity, data.status || 'available'],
    cb
  ),
  update: (id, data, cb) => db.query(
    'UPDATE tables SET table_number=?, capacity=?, status=? WHERE table_id=?',
    [data.table_number, data.capacity, data.status, id],
    cb
  ),
  delete: (id, cb) => db.query('DELETE FROM tables WHERE table_id=?', [id], cb)
};

module.exports = Table;
