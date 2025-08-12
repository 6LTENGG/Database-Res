const db = require("../config/db.js");

// Get all orders
exports.getAllOrders = (callback) => {
  // Joining tables table_number for better info
  const query = `
    SELECT o.*, t.table_number 
    FROM orders o
    JOIN tables t ON o.table_id = t.table_id
    ORDER BY o.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Add a new order
exports.addOrder = (table_id, details, amount, callback) => {
  if (table_id == null || details == null || amount == null) {
    return callback(new Error("Missing required fields"));
  }
  db.query(
    "INSERT INTO orders (table_id, order_details, total_amount) VALUES (?, ?, ?)",
    [table_id, details, amount],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Update order status
exports.updateOrderStatus = (id, status, callback) => {
  if (!id || !status) {
    return callback(new Error("Missing required fields"));
  }
  db.query(
    "UPDATE orders SET status = ? WHERE order_id = ?",
    [status, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};
// Get order by ID