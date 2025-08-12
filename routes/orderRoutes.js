const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.list);
router.post('/', orderController.create);
router.post('/update/:id', orderController.update);
router.get('/delete/:id', orderController.delete);

module.exports = router;
