// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('./config/dotenv');
const corsMiddleware = require('./middlewares/cors');
const inventoryRoutes = require('./routes/Inventory');
const orderRoutes = require('./routes/Orders');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/User.js');
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(console.log('mongoose connected'));

// Body parser middleware
app.use(bodyParser.json());

// CORS middleware
app.use(corsMiddleware);

// Routes
app.use(inventoryRoutes);
app.use(orderRoutes);
app.use(userRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
