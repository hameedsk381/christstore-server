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
    coAuthors: {
        type: [String],  // Array of strings for co-authors
        default: []
    },
    publisher: {
        type: String,
        trim: true
    },
    mrp: {
        type: Number,
        min: [0, 'MRP cannot be negative']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    offer: {
        type: String,
        trim: true
    },
    bookType: {
        type: String,
        enum: ['Hardcover', 'Paperback'], // Restrict book type to hardcover or paperback
        trim: true
    },
    publicationYear: {
        type: Number,
        min: [0, 'Publication year cannot be negative']
    },
    isbn: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        default: 'path/to/default/image.jpg'
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
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Inventory', inventorySchema);
