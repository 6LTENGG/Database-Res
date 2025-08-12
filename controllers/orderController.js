const Order = require("../models/orderModel");

// READ all orders
exports.showOrders = (req, res) => {
  Order.getAllOrders((err, orders) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.render("orders", { orders });
  });
};

// READ single order by ID
exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  Order.getOrderById(orderId, (err, order) => {
    if (err) {
      console.error("Error fetching order:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    if (!order) return res.status(404).send("Order not found");
    res.render("orderDetails", { order });
  });
};

// CREATE new order
exports.createOrder = (req, res) => {
  const orderData = req.body; // you may want to destructure fields here
  Order.addOrder(orderData, (err) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/orders");
  });
};

// UPDATE order status with redirect
exports.updateOrderStatusRedirect = (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;
  Order.updateOrderStatus(orderId, newStatus, (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/orders");
  });
};

// DELETE order
exports.deleteOrder = (req, res) => {
  Order.deleteOrder(req.params.id, (err) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.redirect("/orders");
  });
};
