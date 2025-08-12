const Order = require('../models/Order');
const Table = require('../models/Table');

exports.list = (req, res) => {
  Order.getAll((err, orders) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    Table.getAll((err2, tables) => {
      if (err2) {
        console.error(err2);
        return res.status(500).send('DB error');
      }
      res.render('orders', { orders, tables });
    });
  });
};

exports.create = (req, res) => {
  Order.create(req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/orders');
  });
};

exports.update = (req, res) => {
  Order.update(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/orders');
  });
};

exports.delete = (req, res) => {
  Order.delete(req.params.id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/orders');
  });
};
