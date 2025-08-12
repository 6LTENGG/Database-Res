const Table = require('../models/Table');

exports.list = (req, res) => {
  Table.getAll((err, tables) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.render('tables', { tables });
  });
};

exports.create = (req, res) => {
  Table.create(req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/tables');
  });
};

exports.update = (req, res) => {
  Table.update(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/tables');
  });
};

exports.delete = (req, res) => {
  Table.delete(req.params.id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB error');
    }
    res.redirect('/tables');
  });
};
