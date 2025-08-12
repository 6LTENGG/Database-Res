const Table = require("../models/tableModel");

// READ all tables
exports.showTables = (req, res) => {
  Table.getAllTables((err, tables) => {
    if (err) {
      console.error("Error fetching tables:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.render("tables", { tables });
  });
};

// READ single table by ID
exports.getTableById = (req, res) => {
  const tableId = req.params.id;
  Table.getTableById(tableId, (err, table) => {
    if (err) {
      console.error("Error fetching table:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    if (!table) return res.status(404).send("Table not found");
    res.render("tableDetails", { table });
  });
};

// CREATE new table
exports.createTable = (req, res) => {
  const { table_number, capacity } = req.body;
  Table.addTable(table_number, capacity, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/tables");
  });
};

// UPDATE table status
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

// DELETE table
exports.deleteTable = (req, res) => {
  Table.deleteTable(req.params.id, (err) => {
    if (err) {
      console.error("Error deleting table:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/tables");
  });
};
