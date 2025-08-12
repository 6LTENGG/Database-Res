const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.list);
router.post('/', tableController.create);
router.post('/update/:id', tableController.update);
router.get('/delete/:id', tableController.delete);

module.exports = router;
