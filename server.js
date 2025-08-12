const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const tableController = require("./controllers/tableController");
const orderController = require("./controllers/orderController");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // for form submissions
app.use(bodyParser.json());
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
app.post("/tables/:id/status", tableController.updateTableStatusRedirect);

// Orders routes
app.get("/orders", orderController.showOrders);
app.post("/orders", orderController.createOrder);
app.post("/orders/:id/status", orderController.updateOrderStatusRedirect);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
