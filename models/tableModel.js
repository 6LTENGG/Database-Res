const db = require("../config/db.js");

// Get all tables
exports.getAllTables = (callback) => {
  db.query("SELECT * FROM tables ORDER BY table_number ASC", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Update table status by table_id
exports.updateTableStatus = (tableId, status, callback) => {
  if (!tableId || !status) {
    return callback(new Error("Missing required fields"));
  }
  db.query(
    "UPDATE tables SET status = ? WHERE table_id = ?",
    [status, tableId],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};
