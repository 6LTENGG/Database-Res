const db = require("../config/db.js");

const Order = {
  // READ all
  getAllOrders: (callback) => {
    const query = `
      SELECT orders.*, tables.table_number 
      FROM orders 
      JOIN tables ON orders.table_id = tables.table_id 
      ORDER BY orders.created_at DESC
    `;
    db.query(query, callback);
  },

  // CREATE
  addOrder: (table_id, order_details, total_amount, callback) => {
    if (!table_id || !order_details || !total_amount) {
      return callback(new Error("Missing required fields"));
    }
    const sql = `INSERT INTO orders (table_id, order_details, total_amount) VALUES (?, ?, ?)`;
    db.query(sql, [table_id, order_details, total_amount], callback);
  },

  // READ single
  getOrderById: (id, callback) => {
    if (!id) return callback(new Error("Missing order ID"));
    const sql = `
      SELECT orders.*, tables.table_number 
      FROM orders 
      JOIN tables ON orders.table_id = tables.table_id 
      WHERE orders.order_id = ?
    `;
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // UPDATE status
  updateOrderStatus: (orderId, status, callback) => {
    if (!orderId || !status) {
      return callback(new Error("Missing required fields"));
    }
    const sql = `UPDATE orders SET status = ? WHERE order_id = ?`;
    db.query(sql, [status, orderId], callback);
  },

  // DELETE
  deleteOrder: (id, callback) => {
    if (!id) return callback(new Error("Missing order ID"));
    db.query("DELETE FROM orders WHERE order_id = ?", [id], callback);
  }
};

module.exports = Order;
