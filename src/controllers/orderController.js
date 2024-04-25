
const nodemailer = require('nodemailer');
const Order = require('../models/Orders');
const User = require('../models/User');
// Controller functions for inventory management

// Get all orders with product titles
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'orderItems.product',
            model: 'Inventory',
            select: 'title'
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        // First, save the order
        const savedOrder = await newOrder.save();

        // // Next, find the user based on userId provided in the order
        // const user = await User.findById(req.body.user);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found to send mail" });
        // }

        // // Setup Nodemailer transporter
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail', // or another email provider
        //     auth: {
        //         user: 'hameedsk381@gmail.com', // Your email
        //         pass: 'keer@hameed' // Your email password
        //     }
        // });

        // // Email options
        // const mailOptions = {
        //     from: 'hameedsk381@gmail.com',
        //     to: user.email, // User's email fetched from the database
        //     subject: 'Order Confirmation',
        //     text: `Hi ${user.username}, your order has been placed successfully!` // Customize email text as needed
        // };

        // // Send the email
        // await transporter.sendMail(mailOptions);

        // // Return the saved order
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing inventory item
exports.updateOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an inventory item
exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteOrder = await Order.findByIdAndDelete(id);
        if (!deleteOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get orders by user
exports.getOrdersByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ user: userId }).populate({
            path: 'orderItems.product',
            model: 'Inventory',
            select: 'title'
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
