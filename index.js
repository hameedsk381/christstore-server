// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('./src/config/dotenv.js');
const corsMiddleware = require('./src/middlewares/cors.js');
const inventoryRoutes = require('./src/routes/Inventory.js');
const orderRoutes = require('./src/routes/Orders.js');
const messagesRoutes = require('./src/routes/BibleMessagesRouter.js');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./src/routes/User.js');
const songsRouter = require('./src/routes/songs.js');
const wordRoutes = require('./src/routes/Word.js');
const promotionRoutes = require('./src/routes/Promotion.js');
const Song = require('./src/models/Song.js');
const Category = require('./src/models/Category.js')
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
app.use(songsRouter);
app.use(messagesRoutes);
app.use(wordRoutes);
app.use(promotionRoutes);
// // Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to our website');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
