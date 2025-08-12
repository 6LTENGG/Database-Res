const Table = require("../models/tableModel");

exports.showTables = (req, res) => {
  Table.getAllTables((err, tables) => {
    if (err) return res.status(500).send("Database error: " + err);
    res.render("tables", { tables });
  });
};

// Update status then redirect to /tables to avoid JSON response page
exports.updateTableStatusRedirect = (req, res) => {
  const tableId = req.params.id;
  const newStatus = req.body.status;
  Table.updateTableStatus(tableId, newStatus, (err, result) => {
    if (err) return res.status(500).send("Database error: " + err);
    res.redirect("/tables");
  });
};
