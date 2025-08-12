// models/tableModel.js
const db = require("../config/db.js");

const Table = {
  getAllTables: (callback) => {
    const sql = `SELECT * FROM tables ORDER BY table_number ASC`;
    db.query(sql, callback);
  },

  addTable: (table_number, capacity, callback) => {
    if (!table_number || !capacity) {
      return callback(new Error("Missing required fields"));
    }
    const sql = `INSERT INTO tables (table_number, capacity) VALUES (?, ?)`;
    db.query(sql, [table_number, capacity], callback);
  },

  updateTableStatus: (tableId, status, callback) => {
    if (!tableId || !status) {
      return callback(new Error("Missing required fields"));
    }
    const sql = `UPDATE tables SET status = ? WHERE table_id = ?`;
    db.query(sql, [status, tableId], callback);
  },

  deleteTable: (tableId, callback) => {
    if (!tableId) return callback(new Error("Missing table ID"));
    db.query("DELETE FROM tables WHERE table_id = ?", [tableId], callback);
  }
};

module.exports = Table;
