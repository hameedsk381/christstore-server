// src/controllers/inventoryController.js
const Inventory = require('../models/Inventory');

// Controller functions for inventory management

// Get all inventory items
exports.getAllItems = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new inventory item
exports.addItem = async (req, res) => {
    const newItem = new Inventory(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing inventory item
exports.updateItem = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an inventory item
exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedItem = await Inventory.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
