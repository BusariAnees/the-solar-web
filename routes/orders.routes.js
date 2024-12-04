const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router  = express.Router();

router.post('/', ordersController.addOrder); // /order

router.get('/', ordersController.getOrders); // /orders


module.exports = router;