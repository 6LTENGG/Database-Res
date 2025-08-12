const express = require("express");
const cors = require("cors");
const path = require("path");

const tableController = require("./controllers/tableController");
const orderController = require("./controllers/orderController");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json()); // parse JSON
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Tables routes
app.get("/tables", tableController.showTables);
app.post("/tables", tableController.createTable);               // <-- Added this line
app.post("/tables/:id/status", tableController.updateTableStatusRedirect);
app.post("/tables/:id/delete", tableController.deleteTable);

// Orders routes
app.get("/orders", orderController.showOrders);
app.post("/orders", orderController.createOrder);
app.post("/orders/:id/status", orderController.updateOrderStatusRedirect);
app.post("/orders/:id/delete", orderController.deleteOrder);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
