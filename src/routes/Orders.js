const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for order-related endpoints

// Get all orders
router.get('/api/orders', orderController.getAllOrders);

// Add a new order
router.post('/api/orders', orderController.addOrder);

// Update an existing order
router.put('/api/orders/:id', orderController.updateOrder);

// Delete an order
router.delete('/api/orders/:id', orderController.deleteOrder);
// Add a route to get orders by user
router.get('/api/orders/user/:userId', orderController.getOrdersByUser);

module.exports = router;
