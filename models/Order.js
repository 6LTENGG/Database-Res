const db = require('../config/db');

const Order = {
  getAll: (cb) => db.query(
    `SELECT o.*, t.table_number 
     FROM orders o
     LEFT JOIN tables t ON o.table_id = t.table_id
     ORDER BY o.created_at DESC`,
    cb
  ),
  create: (data, cb) => db.query(
    'INSERT INTO orders (table_id, order_details, total_amount, status) VALUES (?, ?, ?, ?)',
    [data.table_id, data.order_details, data.total_amount, data.status || 'queued'],
    cb
  ),
  update: (id, data, cb) => db.query(
    'UPDATE orders SET table_id=?, order_details=?, total_amount=?, status=? WHERE order_id=?',
    [data.table_id, data.order_details, data.total_amount, data.status, id],
    cb
  ),
  delete: (id, cb) => db.query('DELETE FROM orders WHERE order_id=?', [id], cb)
};

module.exports = Order;
