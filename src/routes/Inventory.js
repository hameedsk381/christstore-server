// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Routes for inventory-related endpoints

// Get all inventory items
router.get('/api/inventory', inventoryController.getAllItems);

// Add a new inventory item
router.post('/api/inventory', inventoryController.addItem);

// Update an existing inventory item
router.put('/api/inventory/:id', inventoryController.updateItem);

// Delete an inventory item
router.delete('/api/inventory/:id', inventoryController.deleteItem);

module.exports = router;
