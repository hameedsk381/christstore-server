const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        default: 'path/to/default/image.jpg'  // Assuming a default image path if none is provided
    },
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});
module.exports = mongoose.model('Inventory', inventorySchema);