// src/controllers/userController.js
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');


// Set up nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your preferred service
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send a password reset email
exports.forgotPassword = async (req, res) => {
    // 1. Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send('There is no user with that email address.');
    }

    // 2. Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3. Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await transporter.sendMail({
            to: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            text: message
        });

        res.status(200).send({
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).send('There was an error sending the email. Try again later!');
    }
};

// Reset the password
exports.resetPassword = async (req, res) => {
    // 1. Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2. If token has not expired, and there is user, set the new password
    if (!user) {
        return res.status(400).send('Token is invalid or has expired');
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3. Update changedPasswordAt property for the user
    // 4. Log the user in, send JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({
        message: 'Password successfully reset!',
        token
    });
};

// Handles user registration
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password,phoneNum } = req.body;
        const user = new User({ username, email, password,phoneNum });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handles user login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'Logged in successfully', token ,userId:user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Handles fetching user profile
exports.fetchUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
