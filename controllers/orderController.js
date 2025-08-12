const Order = require("../models/orderModel");

exports.showOrders = (req, res) => {
  Order.getAllOrders((err, results) => {
    if (err) return res.status(500).send(err);
    res.render("orders", { orders: results });
  });
};

exports.createOrder = (req, res) => {
  const { table_id, order_details, total_amount } = req.body;
  Order.addOrder(table_id, order_details, total_amount, (err, result) => {
    if (err) return res.status(500).send(err);
    res.redirect("/orders");  // redirect to orders page after creation
  });
};

// Update status then redirect to /orders
exports.updateOrderStatusRedirect = (req, res) => {
  const { status } = req.body;
  Order.updateOrderStatus(req.params.id, status, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/orders");
  });
};
