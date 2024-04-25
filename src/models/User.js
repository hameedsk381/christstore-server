// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNum:{type:Number,required: true},
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],  // Define possible roles
        default: 'user'
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
