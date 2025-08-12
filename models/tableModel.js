const db = require("../config/db.js");

const Table = {
  // READ all
  getAllTables: (callback) => {
    db.query("SELECT * FROM tables ORDER BY table_number ASC", callback);
  },

  // CREATE
  addTable: (table_number, capacity, callback) => {
    if (!table_number || !capacity) {
      return callback(new Error("Missing required fields"));
    }
    db.query(
      "INSERT INTO tables (table_number, capacity) VALUES (?, ?)",
      [table_number, capacity],
      callback
    );
  },

  // READ single
  getTableById: (id, callback) => {
    if (!id) return callback(new Error("Missing table ID"));
    db.query(
      "SELECT * FROM tables WHERE table_id = ?",
      [id],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
      }
    );
  },

  // UPDATE status
  updateTableStatus: (tableId, status, callback) => {
    if (!tableId || !status) {
      return callback(new Error("Missing required fields"));
    }
    db.query(
      "UPDATE tables SET status = ? WHERE table_id = ?",
      [status, tableId],
      callback
    );
  },

  // DELETE
  deleteTable: (id, callback) => {
    if (!id) return callback(new Error("Missing table ID"));
    db.query("DELETE FROM tables WHERE table_id = ?", [id], callback);
  }
};

module.exports = Table;
