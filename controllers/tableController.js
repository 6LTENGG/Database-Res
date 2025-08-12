// controllers/tableController.js
const Table = require("../models/tableModel");

exports.showTables = (req, res) => {
  Table.getAllTables((err, tables) => {
    if (err) {
      console.error("Error fetching tables:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.render("tables", { tables });
  });
};

exports.createTable = (req, res) => {
  const { table_number, capacity } = req.body;
  console.log("Received create table:", req.body);  // Debug log
  Table.addTable(table_number, capacity, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/tables");
  });
};

exports.updateTableStatusRedirect = (req, res) => {
  const tableId = req.params.id;
  const newStatus = req.body.status;
  Table.updateTableStatus(tableId, newStatus, (err) => {
    if (err) {
      console.error("Error updating table status:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/tables");
  });
};

exports.deleteTable = (req, res) => {
  const tableId = req.params.id;
  Table.deleteTable(tableId, (err) => {
    if (err) {
      console.error("Error deleting table:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/tables");
  });
};
